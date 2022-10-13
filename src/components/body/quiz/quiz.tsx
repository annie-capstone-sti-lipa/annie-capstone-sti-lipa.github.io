import { useState } from "react";
import "./quiz.scss";

import backIcon from "../../../assets/icons/back.svg";

enum characterType {
  hiragana = "Hiragana",
  katakana = "Katakana",
  kanji = "Kanji",
}

enum kanaOrderingSystem {
  gojuuon = "Gojuuon",
  dakuon = "Dakuon",
  youon = "Youon",
}

enum kanjiReadings {
  onyomi = "Onyomi",
  kunyomi = "Kunyomi",
  englishMeanings = "English Meanings",
}

export default function Quiz() {
  const [quizType, setQuizType] = useState<characterType | null>(null);
  const [quiz, setQuiz] = useState<kanaOrderingSystem | kanjiReadings | null>(
    null
  );

  return (
    <div className="quiz">
      <div className="title-container">
        {quizType !== null && (
          <div
            className="back-button"
            onClick={() => (quiz === null ? setQuizType(null) : setQuiz(null))}
          >
            <img className="back-icon" src={backIcon} alt="back" />
          </div>
        )}
        <div className="title">
          <span>Quiz</span>
          {quizType !== null && ` > ${quizType}`}
          {quiz !== null && ` > ${quiz}`}
        </div>
      </div>
      {quizType == null ? (
        <QuizChoice chooseQuiz={(choice) => setQuizType(choice)} />
      ) : quiz == null ? (
        <QuizDifficulty
          writingStyle={quizType}
          isKanji={quizType === characterType.kanji}
          chooseQuiz={(choice) => setQuiz(choice)}
        />
      ) : (
        <QuizQuestions />
      )}
      <div className="spacer"></div>
    </div>
  );
}

function QuizChoice({
  chooseQuiz,
}: {
  chooseQuiz: (quizType: characterType) => void;
}) {
  return (
    <div className="quiz-choice">
      <div className="instruction">Choose Writing System.</div>
      {Object.values(characterType).map((item) => {
        return <QuizChoiceCard item={item} onClick={chooseQuiz} />;
      })}
    </div>
  );
}

function QuizDifficulty({
  writingStyle,
  chooseQuiz,
  isKanji,
}: {
  writingStyle: characterType;
  chooseQuiz: (difficulty: kanaOrderingSystem | kanjiReadings) => void;
  isKanji: boolean;
}) {
  return (
    <div className="quiz-difficulty">
      <div className="writing-style">{writingStyle}</div>
      <div className="instruction">Choose Quiz</div>
      {Object.values(isKanji ? kanjiReadings : kanaOrderingSystem).map(
        (item) => {
          return <QuizChoiceCard item={item} onClick={chooseQuiz} />;
        }
      )}
    </div>
  );
}

function QuizChoiceCard({
  item,
  onClick,
}: {
  item: any;
  onClick: (quizType: any) => void;
}) {
  return (
    <div className="quiz-choice-card" onClick={() => onClick(item)}>
      {item}
    </div>
  );
}

function QuizQuestions() {
  return (
    <div className="quiz-questions">
      <div>Choose the corresponding reading for the character below.</div>
      <CharacterCard character="せ" />
      <div className="choice-card-container">
        <ChoiceCard choice="se" />
        <ChoiceCard choice="re" />
        <ChoiceCard choice="pe" />
        <ChoiceCard choice="le" />
      </div>
    </div>
  );
}

function CharacterCard({ character }: { character: string }) {
  return <div className="character-card">{character}</div>;
}

function ChoiceCard({ choice }: { choice: string }) {
  return <div className="choice-card">{choice}</div>;
}
