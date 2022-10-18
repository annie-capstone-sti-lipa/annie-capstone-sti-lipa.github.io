import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnnieAPI from "../../../helpers/annie-api";
import { Loader, MiniLoader } from "../../general/loader/loader";
import { updateScores } from "../../../redux/reducers/login";
import "./kanji-kana.scss";

export default function KanjiKana() {
  const user = useSelector((state: any) => state.isLoggedIn.user);
  const scores = useSelector((state: any) => state.isLoggedIn.quizScores);
  const dispatch = useDispatch();

  const [fetchingScores, setFetchingScores] = useState(false);

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
        <>
          <div className="title">
            <span>Quiz Scores</span> {fetchingScores && <MiniLoader />}
          </div>
          <div className="score-list">
            <ScoreItem name="Kanji" score={scores?.kanji ?? 0} />
            <ScoreItem name="Hiragana" score={scores?.hiragana ?? 0} />
            <ScoreItem name="Katakana" score={scores?.katakana ?? 0} />
          </div>
        </>
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
