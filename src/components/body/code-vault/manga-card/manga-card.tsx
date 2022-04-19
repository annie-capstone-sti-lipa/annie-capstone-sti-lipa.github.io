import "./manga-card.scss";

import trashIcon from "../../../../assets/icons/trash.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import backIcon from "../../../../assets/icons/left.svg";
import nextIcon from "../../../../assets/icons/right.svg";

import { useState } from "react";
import Modal from "../../../general/modal/modal";

export default function MangaCard({ sauce }: { sauce: number }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="manga-card" onClick={() => setShowModal(true)}>
      <Modal
        overlayClassName="manga-overlay"
        showModal={showModal}
        closeModal={() => setShowModal(() => false)}
        body={
          <ModalBody
            sauce={sauce}
            closeModal={() => setShowModal(() => false)}
          />
        }
      />
      <div className="sauce">{sauce}</div>
      <img
        src={`https://t5.nhentai.net/galleries/${sauce}/cover.jpg`}
        alt="manga thumbnail"
        className="thumbnail"
        referrerPolicy="same-origin"
      />
      <div className="buttons">
        <div
          className="edit-button"
          onClick={(event) => event.stopPropagation()}
        >
          <img className="button-icon" src={editIcon} alt="edit button" />
        </div>
        <div
          className="delete-button"
          onClick={(event) => event.stopPropagation()}
        >
          <img className="button-icon" src={trashIcon} alt="delete button" />
        </div>
      </div>
    </div>
  );
}

function ModalBody({
  closeModal,
  sauce,
}: {
  closeModal: () => void;
  sauce: number;
}) {
  return (
    <div className="manga-modal" onClick={(event) => event.stopPropagation()}>
      <div className="page-container">
        <div className="control-icon-container">
          <img src={backIcon} alt="back" className="control-icon" />
        </div>
        <img
          src={`https://t5.nhentai.net/galleries/${sauce}/cover.jpg`}
          alt="page"
          className="page"
          referrerPolicy="same-origin"
        />
        <div className="control-icon-container">
          <img src={nextIcon} alt="next" className="control-icon" />
        </div>
      </div>
      <div className="counter">1/1</div>
    </div>
  );
}
