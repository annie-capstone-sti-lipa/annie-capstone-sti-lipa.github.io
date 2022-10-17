class QuizScores {
  kanji: number;
  hiragana: number;
  katakana: number;

  constructor(parsedResponse: any) {
    this.kanji = parsedResponse.kanji;
    this.hiragana = parsedResponse.hiragana;
    this.katakana = parsedResponse.katakana;
  }
}

export default QuizScores;
