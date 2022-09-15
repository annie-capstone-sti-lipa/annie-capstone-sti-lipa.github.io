import AnimeItem from "../types/anime-item";
import { DaySchedules } from "../types/day-schedules";
import Sauce from "../types/sauce";
import SuccessResponse from "../types/success-response";
import AlertHelper from "./alert-helper";

export default class AnnieAPI {
  static isLoggedIn = () => null;

  static _link = (path: string) => `${process.env.REACT_APP_API!}/${path}`;

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

  static async logIn(): Promise<SuccessResponse> {
    let loginResponse = await fetch(this._link("login"), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "username",
        password: "password",
      }),
    });
    let parsedResponse = await loginResponse.json();
    return new SuccessResponse(parsedResponse.success, parsedResponse.message);
  }

  static async getWeekSchedule(): Promise<Array<DaySchedules>> {
    let response = await fetch(this._link("weekSchedule"), {
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
