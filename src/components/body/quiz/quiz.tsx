import { useState } from "react";
import "./quiz.scss";

enum quizType {
  hiragana = "Hiragana",
  katakana = "Katakana",
  kanji = "Kanji",
}

export default function Quiz() {
  const [quizType, setQuizType] = useState<quizType | null>(null);

  return (
    <div className="quiz">
      {quizType != null ? (
        <QuizQuestions />
      ) : (
        <QuizChoice chooseQuiz={(choice) => setQuizType(choice)} />
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
      <QuizTypeCard type={quizType.hiragana} chooseQuiz={chooseQuiz} />
      <QuizTypeCard type={quizType.katakana} chooseQuiz={chooseQuiz} />
      <QuizTypeCard type={quizType.kanji} chooseQuiz={chooseQuiz} />
    </div>
  );
}

function QuizTypeCard({
  type,
  chooseQuiz,
}: {
  type: quizType;
  chooseQuiz: (quizType: quizType) => void;
}) {
  return (
    <div className="quiz-type-card" onClick={() => chooseQuiz(type)}>
      {type}
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
