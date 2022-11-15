import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnnieAPI from "../../../helpers/annie-api";
import { Loader, MiniLoader } from "../../general/loader/loader";
import { updateScores } from "../../../redux/reducers/login";
import "./kanji-kana.scss";
import EditIcon from "../../general/edit-icon/edit-icon";
import Modal from "../../general/modal/modal";
import UserQuizScore from "../../../types/user-quiz-score";

import crownIcon from "../../../assets/icons/crown.svg";
import tempPfp from "../../../assets/icons/temp_pfp.svg";

import { fireBaseHelper } from "../../../App";
import quizSortCategory from "../../../types/enums/quiz-sort-category";
import QuizScores from "../../../types/quiz-scores";

export default function KanjiKana() {
  const user = useSelector((state: any) => state.isLoggedIn.user);
  const scores = useSelector((state: any) => state.isLoggedIn.quizScores);
  const dispatch = useDispatch();

  const [fetchingScores, setFetchingScores] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFetchingScores(true);
    AnnieAPI.getScores(user.uid)
      .then((response) => {
        dispatch(updateScores(response));
      })
      .finally(() => setFetchingScores(false));
  }, [user.uid, dispatch]);

  return (
    <div className="kanji-kana">
      {fetchingScores && scores === null ? (
        <Loader />
      ) : !fetchingScores && scores === null ? (
        <div>Couldn't fetch scores 😥</div>
      ) : (
        <div
          className="quiz-scores-container"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <Modal
            showModal={showModal}
            closeModal={() => setShowModal(() => false)}
            body={<ModalBody closeModal={() => setShowModal(() => false)} />}
          />
          <EditIcon icon={crownIcon} />
          <div className="title">
            <span>Quiz Scores</span> {fetchingScores && <MiniLoader />}
          </div>
          <div className="score-list">
            <ScoreItem name="Kanji" score={scores?.kanji ?? 0} />
            <ScoreItem name="Hiragana" score={scores?.hiragana ?? 0} />
            <ScoreItem name="Katakana" score={scores?.katakana ?? 0} />
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreItem({ name, score }: { name: string; score: number }) {
  return (
    <div className="score-item">
      <span className="name">{name}:</span>
      <span className="score">{score.toPrecision(4)}%</span>
    </div>
  );
}

function ModalBody({ closeModal }: { closeModal: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userScores, setUserScores] = useState<Array<UserQuizScore>>();
  const [sortBy, setSortBy] = useState<quizSortCategory>(quizSortCategory.all);

  useEffect(() => {
    setIsLoading(true);
    AnnieAPI.getAllScores()
      .then((scores) => {
        setUserScores(scores);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="quiz-modal" onClick={(event) => event.stopPropagation()}>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="modal-body">
          <div className="sort-by-container">
            <div className="title">Quiz Rankings</div>
            <div className="sort-title-container">
              <div className="sort-title">Sort by:</div>
              <select
                name="sort-by"
                onChange={(event) => {
                  setSortBy(event.target.value as quizSortCategory);
                }}
              >
                {(
                  Object.keys(quizSortCategory) as Array<
                    keyof typeof quizSortCategory
                  >
                ).map((key) => {
                  return (
                    <option value={quizSortCategory[key]} key={key}>
                      {quizSortCategory[key]}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="score-card-container">
            {userScores
              ?.sort((a, b) => {
                switch (sortBy) {
                  case quizSortCategory.kanji:
                    return b.quizScores.kanji - a.quizScores.kanji;
                  case quizSortCategory.hiragana:
                    return b.quizScores.hiragana - a.quizScores.hiragana;
                  case quizSortCategory.katakana:
                    return b.quizScores.katakana - a.quizScores.katakana;
                  default:
                    return (
                      QuizScores.summation(b.quizScores) -
                      QuizScores.summation(a.quizScores)
                    );
                }
              })
              .map((element, index) => {
                return (
                  <div key={`${element.user.name}_${index}`}>
                    <UserQuizCard info={element} rank={index + 1} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

function UserQuizCard({ info, rank }: { info: UserQuizScore; rank: number }) {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    fireBaseHelper.getUserImage(info.userId).then((link) => {
      if (link) {
        setImage(link);
      }
    });
  }, [info.userId]);

  return (
    <div className="quiz-card">
      <div className="rank">{rank}</div>
      <img className="user-image" src={image ?? tempPfp} alt="profile-pic" />
      <div className="user-name">{info.user.name}</div>
      <div className="user-bio">{info.user.bio}</div>
      <div className="score-list">
        <ScoreItem name="Kanji" score={info.quizScores?.kanji ?? 0} />
        <ScoreItem name="Hiragana" score={info.quizScores?.hiragana ?? 0} />
        <ScoreItem name="Katakana" score={info.quizScores?.katakana ?? 0} />
      </div>
    </div>
  );
}
