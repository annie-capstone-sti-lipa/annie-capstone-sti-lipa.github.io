export default class AnimeItem {
  name: string;
  thumbnail: string;
  score: number;

  constructor(name: string, thumbnail: string, score: number) {
    this.name = name;
    this.thumbnail = thumbnail;
    this.score = score;
  }
}
