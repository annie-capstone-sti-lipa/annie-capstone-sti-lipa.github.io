import { useCallback, useEffect, useState } from "react";
import "./quiz.scss";

import backIcon from "../../../assets/icons/back.svg";
import kanaOrderingSystem from "../../../types/enums/kana-ordering-system";
import kanjiReadings from "../../../types/enums/kanji-readings";
import writingSystem from "../../../types/enums/writing-system";
import AnnieAPI from "../../../helpers/annie-api";
import { Loader } from "../../general/loader/loader";
import AlertHelper from "../../../helpers/alert-helper";
import QuizQuestion from "../../../types/kana-quiz";

export default function Quiz() {
  const [quizType, setQuizType] = useState<writingSystem | null>(null);
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
          isKanji={quizType === writingSystem.kanji}
          chooseQuiz={(choice) => setQuiz(choice)}
        />
      ) : (
        <QuizQuestions
          ordering={quiz}
          writing={quizType}
          exitQuiz={() => {
            setQuiz(null);
            setQuizType(null);
          }}
        />
      )}
      <div className="spacer"></div>
    </div>
  );
}

function QuizChoice({
  chooseQuiz,
}: {
  chooseQuiz: (quizType: writingSystem) => void;
}) {
  return (
    <div className="quiz-choice">
      <div className="instruction">Choose Writing System.</div>
      {Object.values(writingSystem).map((item) => {
        return <QuizChoiceCard item={item} onClick={chooseQuiz} key={item} />;
      })}
    </div>
  );
}

function QuizDifficulty({
  writingStyle,
  chooseQuiz,
  isKanji,
}: {
  writingStyle: writingSystem;
  chooseQuiz: (difficulty: kanaOrderingSystem | kanjiReadings) => void;
  isKanji: boolean;
}) {
  return (
    <div className="quiz-difficulty">
      <div className="writing-style">{writingStyle}</div>
      <div className="instruction">Choose Quiz</div>
      {Object.values(isKanji ? kanjiReadings : kanaOrderingSystem).map(
        (item) => {
          return <QuizChoiceCard item={item} onClick={chooseQuiz} key={item} />;
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

function QuizQuestions({
  writing,
  ordering,
  exitQuiz,
}: {
  writing: writingSystem;
  ordering: kanaOrderingSystem | kanjiReadings;
  exitQuiz: () => void;
}) {
  const [questions, setQuestions] = useState<Array<QuizQuestion>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getQuestions = useCallback(() => {
    AnnieAPI.getQuiz(writing, ordering)
      .then((response) => {
        setQuestions(response);
      })
      .catch((e) => {
        AlertHelper.errorToast(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [writing, ordering]);

  useEffect(() => {
    if (questions.length === 0) {
      getQuestions();
    }
  }, [questions.length, getQuestions]);

  useEffect(() => {
    if (currentIndex === questions.length && questions.length > 0) {
      exitQuiz();
      AlertHelper.successAlert(
        writing + " Quiz Result:",
        "You scored: " + score + " out of " + questions.length
      );
    }
  }, [currentIndex, questions.length, score, exitQuiz, writing]);

  return (
    <div className="quiz-questions">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          {currentIndex === questions.length && questions.length > 0 ? (
            <div>You scored {score}</div>
          ) : (
            <>
              <div>
                Choose the corresponding reading for the character below.
              </div>
              <div className="score-counter">
                Score: {score} out of {questions.length}
              </div>
              <div className="score-counter">
                Question number: {currentIndex + 1}
              </div>
              <CharacterCard character={questions[currentIndex].character} />
              <div className="choice-card-container">
                {questions[currentIndex].choices.map((item, index) => (
                  <ChoiceCard
                    key={item + index}
                    choice={item}
                    onClick={(answer) => {
                      if (answer === questions[currentIndex].correctAnswer) {
                        AlertHelper.successToast("Correct");
                        setScore((current) => current + 1);
                      } else {
                        AlertHelper.infoAlert(
                          "The correct answer is: " +
                            questions[currentIndex].correctAnswer
                        );
                      }
                      setCurrentIndex((current) => current + 1);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function CharacterCard({ character }: { character: string }) {
  return <div className="character-card">{character}</div>;
}

function ChoiceCard({
  choice,
  onClick,
}: {
  choice: string;
  onClick: (choice: string) => void;
}) {
  return (
    <div className="choice-card" onClick={() => onClick(choice)}>
      {choice}
    </div>
  );
}
