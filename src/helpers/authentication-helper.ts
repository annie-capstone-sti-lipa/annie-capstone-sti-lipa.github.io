import { FirebaseApp } from "@firebase/app";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  updateCurrentUser,
} from "firebase/auth";

export default class AuthenticationHelper {
  auth: Auth;

  public signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(this.auth, email, password);
  };

  public login = (email: string, password: string) => {
    return signInWithEmailAndPassword(this.auth, email, password);
  };

  public resetPassword = (email: string) => {
    return sendPasswordResetEmail(this.auth, email);
  };

  public updateName = (name: string) => {
    return updateProfile(this.auth.currentUser!, { displayName: name });
  };

  public triggerUpdate() {
    return updateCurrentUser(this.auth, this.auth.currentUser);
  }

  constructor(firebaseInstance: FirebaseApp) {
    this.auth = getAuth(firebaseInstance);
  }
}
