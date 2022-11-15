import UserInfo from "./user-info";
import QuizScores from "./quiz-scores";

class UserQuizScore {
  user: UserInfo;
  quizScores: QuizScores;
  userId: string;

  constructor(user: UserInfo, quizScores: QuizScores, userId: string) {
    this.user = user;
    this.quizScores = quizScores;
    this.userId = userId;
  }
}

export default UserQuizScore;
