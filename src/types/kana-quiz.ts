class QuizQuestion {
  character: string;
  correctAnswer: string;
  choices: Array<string> = [];

  constructor(
    character: string,
    correctAnswer: string,
    choices: Array<string>
  ) {
    this.character = character;
    this.correctAnswer = correctAnswer;
    this.choices = choices;
  }
}

export default QuizQuestion;
