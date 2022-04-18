import { useState } from "react";
import "./quiz.scss";

enum quizType {
  hiragana = "Hiragana",
  katakana = "Katakana",
  kanji = "Kanji",
}

enum quizDifficulty {
  easy = "Hard",
  normal = "Normal",
  hard = "Easy",
}

export default function Quiz() {
  const [quizType, setQuizType] = useState<quizType | null>(null);
  const [quizDifficulty, setQuizDifficulty] = useState<quizDifficulty | null>(
    null
  );

  return (
    <div className="quiz">
      {quizType == null ? (
        <QuizChoice chooseQuiz={(choice) => setQuizType(choice)} />
      ) : quizDifficulty == null ? (
        <QuizDifficulty
          writingStyle={quizType}
          chooseDifficulty={(choice) => setQuizDifficulty(choice)}
        />
      ) : (
        <QuizQuestions />
      )}
    </div>
  );
}

function QuizChoice({
  chooseQuiz,
}: {
  chooseQuiz: (quizType: quizType) => void;
}) {
  return (
    <div className="quiz-choice">
      <div className="instruction">Choose Writing System.</div>
      <QuizChoiceCard item={quizType.hiragana} onClick={chooseQuiz} />
      <QuizChoiceCard item={quizType.katakana} onClick={chooseQuiz} />
      <QuizChoiceCard item={quizType.kanji} onClick={chooseQuiz} />
    </div>
  );
}

function QuizDifficulty({
  writingStyle,
  chooseDifficulty,
}: {
  writingStyle: quizType;
  chooseDifficulty: (difficulty: quizDifficulty) => void;
}) {
  return (
    <div className="quiz-difficulty">
      <div className="writing-style">{writingStyle}</div>
      <div className="instruction">Choose Difficulty.</div>
      <QuizChoiceCard item={quizDifficulty.easy} onClick={chooseDifficulty} />
      <QuizChoiceCard item={quizDifficulty.normal} onClick={chooseDifficulty} />
      <QuizChoiceCard item={quizDifficulty.hard} onClick={chooseDifficulty} />
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
