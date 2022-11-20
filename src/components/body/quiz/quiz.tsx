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
import { useSelector } from "react-redux";

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
  function getTooltip() {
    switch (item.toLowerCase()) {
      case "hiragana":
        return "Hiragana is the basic Japanese phonetic alphabet. It represents every sound in the Japanese language.";
      case "katakana":
        return "Katakana are most often used for transcription of words from foreign origin.";
      case "kanji":
        return "Kanji are used for writing nouns, adjectives, adverbs and verbs, Kanji are ideograms, i.e. each character has its own meaning and corresponds to a word.";
      case "gojuuon":
        return "In the Japanese language, the gojūon is a traditional system ordering kana characters by their component phonemes, roughly analogous to alphabetical order.";
      case "dakuon":
        return "Dakuon ( '' ) or dakuten are two small strokes placed on top-left corner of certain hiragana/katakana that changed the sound of those basic kana";
      case "youon":
        return "Youon - when a や [ya] ゆ [yu] よ [yo] sound follows certain characters in Japanese, the sound is shortened and so instead of two separate characters, the sound is written as the combination of the first character and a small subscripted version of the ゃ[ya] ゅ [yu] ょ[yo] character's sound.";
      case "onyomi":
        return "On'yomi are Readings derived from the Chinese pronunciations.";
      case "kunyomi":
        return "Kun'yomi are  the original, indigenous Japanese readings.";
      case "english":
        return "English meanings of the kanji character.";
      default:
        return "no tooltip here";
    }
  }

  return (
    <div
      className="quiz-choice-card"
      onClick={() => onClick(item)}
      title={getTooltip()}
    >
      <span className="choice-name">{item}</span>
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
  const user = useSelector((state: any) => state.isLoggedIn.user);

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
      let saveDialog = AlertHelper.showLoading("Saving quiz result...");

      AnnieAPI.saveQuizResult({
        userId: user.uid,
        writingSystem: writing,
        type: ordering,
        items: questions.length,
        score: score,
      }).finally(() => {
        saveDialog.close();
        AlertHelper.successAlert(
          writing + " Quiz Result:",
          "You scored: " + score + " out of " + questions.length
        );
      });
    }
  }, [
    currentIndex,
    questions.length,
    score,
    exitQuiz,
    writing,
    user.uid,
    ordering,
  ]);

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
