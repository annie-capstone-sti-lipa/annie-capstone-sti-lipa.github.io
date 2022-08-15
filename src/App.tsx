import { useSelector } from "react-redux";
import "./App.scss";
import Body from "./components/body/body";
import Header from "./components/header/header";
import LoadingScreen from "./components/loading-screen/loading-screen";
import Login from "./components/login/login";

function App() {
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn.value);

  if (isLoggedIn) {
    return (
      <div id="app">
        <Header />
        <Body />
      </div>
    );
  } else if (!isLoggedIn) {
    return <Login></Login>;
  }

  return <LoadingScreen></LoadingScreen>;
}

export default App;
