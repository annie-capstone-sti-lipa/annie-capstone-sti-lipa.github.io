import { useDispatch } from "react-redux";
import { authenticationHelper } from "../../App";
import { Loader } from "../general/loader/loader";
import { login } from "../../redux/reducers/login";
import "./loading-screen.scss";

function LoadingScreen() {
  const dispatch = useDispatch();

  authenticationHelper.auth.onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(login(true));
    } else {
      dispatch(login(true));
    }
  });

  return (
    <div id="loading-screen">
      <Loader></Loader>
      <p>Please Wait...</p>
    </div>
  );
}

export default LoadingScreen;
