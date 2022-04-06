import "./kanji-kana.scss";

export default function KanjiKana() {
  return (
    <div className="kanji-kana">
      <div className="title">Quiz Scores</div>
      <div className="score-list">
        <ScoreItem name="Kanji" score={88.2} />
        <ScoreItem name="Hiragana" score={99.7} />
        <ScoreItem name="Katakana" score={94.52} />
      </div>
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
