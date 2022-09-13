export default class AnimeItem {
  name: string;
  thumbnail: string;
  score: number;
  trailer?: string;

  constructor(
    name: string,
    thumbnail: string,
    score: number,
    trailer?: string
  ) {
    this.name = name;
    this.thumbnail = thumbnail;
    this.score = score;
    this.trailer = trailer;
  }
}
