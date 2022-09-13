export default class AnimeItem {
  name: string;
  thumbnail: string;
  score: number;
  trailer?: string;
  synopsis: string;

  constructor(
    name: string,
    thumbnail: string,
    score: number,
    synopsis: string,
    trailer?: string
  ) {
    this.name = name;
    this.thumbnail = thumbnail;
    this.score = score;
    this.synopsis = synopsis;

    this.trailer = trailer;
  }
}
