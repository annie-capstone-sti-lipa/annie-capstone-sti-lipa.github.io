import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getJSDocParameterTags, getJSDocReadonlyTag } from "typescript";
import AnnieAPI from "../../../helpers/annie-api";
import QuizScores from "../../../types/quiz-scores";
import { Loader } from "../../general/loader/loader";
import "./kanji-kana.scss";

export default function KanjiKana() {
  const user = useSelector((state: any) => state.isLoggedIn.user);
  const [scores, setScores] = useState<QuizScores | null>(null);
  const [fetchingScores, setFetchingScores] = useState(false);

  useEffect(() => {
    setFetchingScores(true);
    AnnieAPI.getScores(user.uid)
      .then((response) => setScores(response))
      .finally(() => setFetchingScores(false));
  }, []);

  return (
    <div className="kanji-kana">
      <div className="title">Quiz Scores</div>
      {fetchingScores && scores === null ? (
        <Loader />
      ) : !fetchingScores && scores === null ? (
        <div>Couldn't fetch scores 😥</div>
      ) : (
        <div className="score-list">
          <ScoreItem name="Kanji" score={scores?.kanji ?? 0} />
          <ScoreItem name="Hiragana" score={scores?.hiragana ?? 0} />
          <ScoreItem name="Katakana" score={scores?.katakana ?? 0} />
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
