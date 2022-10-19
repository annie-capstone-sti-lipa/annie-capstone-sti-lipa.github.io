import { useState } from "react";
import Modal from "../modal/modal";
import "./anime-card.scss";

import playIcon from "../../../assets/icons/right.svg";
import animeType from "../../../types/enums/anime-type";
import AnimeItem from "../../../types/anime-item";
import star from "../../../assets/icons/star.svg";
import AnnieAPI from "../../../helpers/annie-api";
import AnimeStatus from "../../../types/anime-status";
import { useSelector } from "react-redux";

export default function AnimeCard({
  type,
  animeItem,
}: {
  type: animeType;
  animeItem: AnimeItem;
}) {
  const [showModal, setShowModal] = useState(false);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  function bottomButton() {
    switch (type) {
      case animeType.watching:
      case animeType.recommendation:
        if (animeItem.trailer) {
          return (
            <div
              className="play-button"
              onClick={(event) => {
                event.stopPropagation();
                setShowTrailerModal(true);
              }}
            >
              <span>Trailer</span>
              <img className="play-icon" src={playIcon} alt="play" />
            </div>
          );
        } else {
          return <span></span>;
        }
      default:
        return <div></div>;
    }
  }

  return (
    <div
      className="anime-card"
      onClick={(event) => {
        event.stopPropagation();
        setShowModal(true);
      }}
    >
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(() => false)}
        body={
          <ModalBody
            closeModal={() => setShowModal(() => false)}
            type={type}
            animeItem={animeItem}
          />
        }
      />
      <Modal
        showModal={showTrailerModal}
        closeModal={() => setShowTrailerModal(() => false)}
        body={
          <TrailerModalBody
            closeModal={() => setShowTrailerModal(() => false)}
            link={animeItem.trailer!}
          />
        }
      />
      <img
        src={animeItem.thumbnail}
        alt="thumbnail"
        className="thumbnail"
        draggable={false}
      />
      <div className="anime-name">{animeItem.name}</div>
      <div className="rating">
        <span className="rating-text">{animeItem.score ?? "??"}</span>
        <img className="mini-rating" src={star} alt="*" />
      </div>
      {bottomButton()}
    </div>
  );
}

function TrailerModalBody({
  closeModal,
  link,
}: {
  closeModal: () => void;
  link: string;
}) {
  return (
    <div className="trailer-modal" onClick={(event) => event.stopPropagation()}>
      <iframe className="player" src={link} title="Trailer"></iframe>
    </div>
  );
}

function ModalBody({
  closeModal,
  type,
  animeItem,
}: {
  closeModal: () => void;
  type: animeType;
  animeItem: AnimeItem;
}) {
  const user = useSelector((state: any) => state.isLoggedIn.user);

  return (
    <div className="anime-modal" onClick={(event) => event.stopPropagation()}>
      <div className="anime-details-container">
        <img
          src={animeItem.thumbnail}
          alt={animeItem.name}
          className="thumbnail"
        />
        <div className="anime-details">
          <div className="title">
            <div className="name">{animeItem.name}</div>
            <div className="genre-list">
              {animeItem.genres.toString().replaceAll(",", ", ")}
            </div>
            <div className="ratings">
              <div className="score">({animeItem.score})</div>
              {Array(Math.round(animeItem.score))
                .fill("")
                .map((_, index) => (
                  <img
                    src={star}
                    alt="*"
                    className="star-icon"
                    key={"star" + index}
                  />
                ))}
            </div>
          </div>
          <div className="synopsis">{animeItem.synopsis}</div>
          <div className="actions">
            <div
              className="blue-button"
              onClick={() => {
                AnnieAPI.updateAnimeStatus(
                  animeItem.id,
                  AnimeStatus.plan_to_watch,
                  user.uid
                );
              }}
            >
              Plan to watch
            </div>
            <div
              className="green-button"
              onClick={() => {
                AnnieAPI.updateAnimeStatus(
                  animeItem.id,
                  AnimeStatus.completed,
                  user.uid,
                  10,
                  10
                );
              }}
            >
              Mark Complete
            </div>
            <div
              className="yellow-button"
              onClick={() => {
                AnnieAPI.updateAnimeStatus(
                  animeItem.id,
                  AnimeStatus.on_hold,
                  user.uid
                );
              }}
            >
              Put on hold
            </div>
            <div
              className="red-button"
              onClick={() => {
                AnnieAPI.updateAnimeStatus(
                  animeItem.id,
                  AnimeStatus.dropped,
                  user.uid
                );
              }}
            >
              Drop
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
