import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Helpers from "./helpers";

export default class FireBaseHelper {
  firestore = getFirestore();
  storage = getStorage();

  public getUserImage = async (userId: string): Promise<string | null> => {
    console.log(userId);
    try {
      return await getDownloadURL(
        ref(this.storage, `user_images/${userId}.png`)
      );
    } catch {
      return null;
    }
  };

  public uploadImage = async (id: string, file: any): Promise<boolean> => {
    let shrunkFile;
    try {
      shrunkFile = await Helpers.resizeImage({ file: file, maxSize: 500 });
    } catch (e) {
      console.error(e);
      shrunkFile = file;
    }
    return await this.uploadFile(id, shrunkFile, "user_images", "png");
  };

  private uploadFile = async (
    id: string,
    file: any,
    directory: string,
    type: string
  ) => {
    try {
      await uploadBytes(ref(this.storage, `${directory}/${id}.${type}`), file);
      return true;
    } catch {
      return false;
    }
  };
}
