import AnimeItem from "./anime-item";

export class DaySchedules {
  day: string;
  animes: Array<AnimeItem>;

  constructor(day: string, animes: Array<AnimeItem>) {
    this.day = day;
    this.animes = animes;
  }
}
