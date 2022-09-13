import AnimeItem from "../types/anime-item";
import { DaySchedules } from "../types/day-schedules";
import SuccessResponse from "../types/success-response";

export default class AnnieAPI {
  static link: string = "localhost:3000";

  static isLoggedIn = () => null;

  static async logIn(): Promise<SuccessResponse> {
    let loginResponse = await fetch("http://localhost:8080/login", {
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
    let response = await fetch("http://localhost:8080/weekSchedule", {
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
                anime.score
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
