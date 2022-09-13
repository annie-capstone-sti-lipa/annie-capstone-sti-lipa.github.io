import SuccessResponse from "../types/success-response";

export default class Annie {
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
}
