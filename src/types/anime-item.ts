export default class AnimeItem {
  name: string;
  thumbnail: string;
  score: number;
  popularity: number;
  synopsis: string;
  trailer?: string;

  constructor(
    name: string,
    thumbnail: string,
    score: number | null | undefined,
    synopsis: string,
    popularity: number | null | undefined,
    trailer?: string
  ) {
    this.name = name;
    this.thumbnail = thumbnail;
    this.score = score ?? 0;
    this.synopsis = synopsis;
    this.popularity = popularity ?? 0;

    this.trailer = trailer;
  }
}
