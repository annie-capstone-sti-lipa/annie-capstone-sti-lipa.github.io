export default class Helpers {
  static getById = (id: string) => {
    return document.getElementById(id);
  };
  static inputGetter = (id: string) => {
    return (document.getElementById(id) as HTMLInputElement)!.value;
  };

  static getFirebaseError = (error: any) => {
    let errorMessage = (error as any).code;
    return errorMessage.substring(
      errorMessage.indexOf("/") + 1,
      errorMessage.length
    );
  };

  static toDateTime = (utcSecs: number) => {
    var t = new Date(0);
    t.setUTCSeconds(utcSecs);
    return t;
  };
}
