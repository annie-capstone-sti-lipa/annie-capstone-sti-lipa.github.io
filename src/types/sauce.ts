export default class Sauce {
  similarity: string;
  sauce: string;
  thumbnail: string;
  extUrls: Array<string>;

  constructor(result: any) {
    this.similarity = result?.similarity;
    this.sauce = result?.sauce ?? "No Title found";
    this.thumbnail = result?.thumbnail;
    this.extUrls = result?.extUrls ?? [];
  }
}
