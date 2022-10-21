import { useSelector } from "react-redux";
import "./App.scss";
import Body from "./components/body/body";
import Header from "./components/header/header";
import LoadingScreen from "./components/loading-screen/loading-screen";
import Login from "./components/login/login";
import AuthenticationHelper from "./helpers/authentication-helper";
import { initializeApp } from "firebase/app";
import FireBaseHelper from "./helpers/firebase-helper";

export const authenticationHelper = new AuthenticationHelper(
  initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  })
);

//TODO: query user's anime list and display status accordingly

export const fireBaseHelper = new FireBaseHelper();

function App() {
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn.isLoggedIn);
  if (isLoggedIn === null) {
    return <LoadingScreen></LoadingScreen>;
  }

  if (isLoggedIn) {
    return (
      <div id="app">
        <Header />
        <Body />
      </div>
    );
  } else {
    return <Login></Login>;
  }
}

export default App;
