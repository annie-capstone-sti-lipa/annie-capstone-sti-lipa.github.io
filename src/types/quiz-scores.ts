class QuizScores {
  kanji: number;
  hiragana: number;
  katakana: number;

  static summation(quizScores: QuizScores) {
    return (quizScores.hiragana + quizScores.katakana + quizScores.kanji) / 3;
  }

  constructor(parsedResponse: any) {
    this.kanji = parsedResponse.kanji;
    this.hiragana = parsedResponse.hiragana;
    this.katakana = parsedResponse.katakana;
  }
}

export default QuizScores;
