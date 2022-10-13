import AnimeItem from "../types/anime-item";
import { DaySchedules } from "../types/day-schedules";
import kanaOrderingSystem from "../types/enums/kana-ordering-system";
import kanjiReadings from "../types/enums/kanji-readings";
import writingSystem from "../types/enums/writing-system";
import QuizQuestion from "../types/kana-quiz";
import Sauce from "../types/sauce";
import AlertHelper from "./alert-helper";

export default class AnnieAPI {
  static isLoggedIn = () => null;

  private static _link = (path: string) =>
    `${process.env.REACT_APP_API!}/${path}`;

  static getMALAuthLink = async (): Promise<string> => {
    let response = await fetch(this._link("mal-auth"), { method: "GET" });
    let parsedResponse = await response.json();

    return (parsedResponse as any)["authLink"];
  };

  static async getSauceFromImage(data: FormData): Promise<Array<Sauce>> {
    let loginResponse = await fetch(this._link("sauce"), {
      method: "POST",
      mode: "cors",
      body: data,
    });
    let parsedResponse = await loginResponse.json();

    let formattedResponse: Array<Sauce> = [];

    parsedResponse.data.forEach((sauce: any) => {
      formattedResponse.push(new Sauce(sauce));
    });
    if (parsedResponse?.error !== undefined) {
      AlertHelper.errorToast(parsedResponse.error);
    } else {
      AlertHelper.successToast("Success");
    }
    return formattedResponse;
  }

  static async getQuiz(
    writing: writingSystem,
    ordering: kanaOrderingSystem | kanjiReadings
  ): Promise<Array<QuizQuestion>> {
    let isKanji = writing === writingSystem.kanji;
    let quizResponse = await fetch(
      isKanji
        ? this._link(`kanji-quiz?reading=${ordering}`)
        : this._link(`kana-quiz?ordering=${ordering}&writing=${writing}`),
      {
        method: "GET",
      }
    );
    let parsedResponse = await quizResponse.json();

    let formattedResponse: Array<QuizQuestion> = [];

    parsedResponse.forEach((item: any) => {
      if (isKanji) {
        formattedResponse.push(
          new QuizQuestion(item.character, item.correctAnswer, item.choices)
        );
      } else {
        formattedResponse.push(
          new QuizQuestion(item.kana, item.correctAnswer, item.romajiChoices)
        );
      }
    });

    if (parsedResponse?.error !== undefined) {
      AlertHelper.errorToast(parsedResponse.error);
    }
    return formattedResponse;
  }

  static async getSauceFromLink(data: FormData): Promise<Array<Sauce>> {
    let loginResponse = await fetch(this._link("sauce"), {
      method: "POST",
      mode: "cors",
      body: data,
    });
    let parsedResponse = await loginResponse.json();

    let formattedResponse: Array<Sauce> = [];

    parsedResponse.data.forEach((sauce: any) => {
      formattedResponse.push(new Sauce(sauce));
    });
    if (parsedResponse?.error !== undefined) {
      AlertHelper.errorToast(parsedResponse.error);
    } else {
      AlertHelper.successToast("Success");
    }
    return formattedResponse;
  }

  static async getWeekSchedule(): Promise<Array<DaySchedules>> {
    let response = await fetch(this._link("getWeekSchedule"), {
      mode: "cors",
    });

    let parsedResponse = await response.json();

    parsedResponse = parsedResponse.map(
      (element: any) =>
        new DaySchedules(
          element["day"],
          (element.schedules ?? []).map(
            (anime: any) =>
              new AnimeItem(
                anime.title,
                anime.images.jpg.large_image_url,
                anime.score,
                anime.synopsis,
                anime.popularity,
                anime.genres.map((genre: any) => genre.name),
                anime.trailer.embed_url
              )
          )
        )
    );

    parsedResponse.forEach((day: DaySchedules, dayIndex: number) => {
      day.animes.forEach((anime: AnimeItem, animeIndex: number) => {
        if (anime.thumbnail.includes("apple-touch-icon")) {
          parsedResponse[dayIndex].animes.splice(animeIndex, 1);
        }
      });
    });

    parsedResponse.forEach((day: DaySchedules, dayIndex: number) => {
      day.animes.sort((a, b) => b.score - a.score);
    });

    return parsedResponse;
  }
}
