class Kana {
  type: string;
  romaji: string;
  kana: string;

  constructor(parsedResponse: any) {
    this.type = parsedResponse.type;
    this.romaji = parsedResponse.romaji;
    this.kana = parsedResponse.kana;
  }
}

export default Kana;
