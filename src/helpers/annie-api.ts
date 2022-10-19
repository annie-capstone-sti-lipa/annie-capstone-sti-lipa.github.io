import AnimeItem from "../types/anime-item";
import { DaySchedules } from "../types/day-schedules";
import kanaOrderingSystem from "../types/enums/kana-ordering-system";
import kanjiReadings from "../types/enums/kanji-readings";
import writingSystem from "../types/enums/writing-system";
import QuizQuestion from "../types/kana-quiz";
import QuizScores from "../types/quiz-scores";
import Sauce from "../types/sauce";
import AlertHelper from "./alert-helper";

import { fireBaseHelper } from "../App";
import { UserInfo } from "firebase/auth";
import AnimeStatus from "../types/anime-status";

export default class AnnieAPI {
  private static _link = (path: string) =>
    `${process.env.REACT_APP_API!}/${path}`;

  static getMALAuthLink = async (userId: string): Promise<string> => {
    let response = await fetch(this._link(`mal-auth?userId=${userId}`), {
      method: "GET",
    });
    let parsedResponse = await response.json();

    return (parsedResponse as any)["authLink"];
  };

  static async saveQuizResult(data: {}): Promise<any> {
    let saveQuizResponse = await fetch(this._link("save-quiz-result"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(data),
    });

    return await saveQuizResponse.json();
  }

  static async saveUserInfo(data: {}): Promise<any> {
    let saveInfoResponse = await fetch(this._link("save-user-info"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(data),
    });

    return await saveInfoResponse.json();
  }

  static async updateAnimeStatus(
    animeId: string,
    status: AnimeStatus,
    userId: string,
    score?: number,
    num_watched_episodes?: number
  ) {
    let updateResponse = await fetch(this._link("update-anime-status"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        animeId: animeId,
        status: status,
        userId: userId,
        score: score,
        num_watched_episodes: num_watched_episodes,
      }),
    });

    let parsedResponse = await updateResponse.json();
    console.log(parsedResponse);

    return parsedResponse;
  }

  static async getUserInfo(userId?: string): Promise<UserInfo | null> {
    let response = await fetch(this._link(`user-info?userId=${userId}`), {
      mode: "cors",
    });

    let parsedResponse = await response.json();

    return parsedResponse.userInfo;
  }

  static async uploadProfilePic(id: string, file: any): Promise<any> {
    return await fireBaseHelper.uploadImage(id, file);
  }

  static async getSauceFromImage(data: FormData): Promise<Array<Sauce>> {
    let sauceResponse = await fetch(this._link("sauce"), {
      method: "POST",
      mode: "cors",
      body: data,
    });
    let parsedResponse = await sauceResponse.json();

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
    let sauceResponse = await fetch(this._link("sauce"), {
      method: "POST",
      mode: "cors",
      body: data,
    });
    let parsedResponse = await sauceResponse.json();

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
                anime.mal_id,
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

  static async getRecommendations(offset?: number): Promise<Array<AnimeItem>> {
    let response = await fetch(
      this._link(
        `recommendations?offset=${offset}&limit=${
          offset === undefined ? 30 : 10
        }`
      ),
      {
        mode: "cors",
      }
    );

    let parsedResponse = await response.json();

    return parsedResponse;
  }

  static async getScores(userId?: string): Promise<QuizScores> {
    let response = await fetch(this._link(`quiz-scores?userId=${userId}`), {
      mode: "cors",
    });

    return await response.json();
  }
}
