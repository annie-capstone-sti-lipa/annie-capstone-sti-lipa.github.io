export default class AnimeItem {
  name: string;
  thumbnail: string;
  score: number;
  popularity: number;
  synopsis: string;
  genres: Array<string>;
  trailer?: string;
  //dateStart:
  //dateEnd:

  //TODO: add the date and don't show in the calendar if the date is past

  constructor(
    name: string,
    thumbnail: string,
    score: number | null | undefined,
    synopsis: string,
    popularity: number | null | undefined,
    genres: Array<string>,
    trailer?: string
  ) {
    this.name = name;
    this.thumbnail = thumbnail;
    this.score = score ?? 0;
    this.synopsis = synopsis;
    this.popularity =
      popularity === null || popularity === 0 ? 99999999 : popularity!;
    this.genres = genres;

    this.trailer = trailer;
  }
}
