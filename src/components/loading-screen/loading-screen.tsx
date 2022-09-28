import { useDispatch } from "react-redux";
import { authenticationHelper } from "../../App";
import { Loader } from "../general/loader/loader";
import { login } from "../../redux/reducers/login";
import "./loading-screen.scss";
import { setLoading, setSchedules } from "../../redux/reducers/anime-schedules";
import AnnieAPI from "../../helpers/annie-api";

function LoadingScreen() {
  const dispatch = useDispatch();

  async function preloadData() {
    dispatch(setLoading(true));
    await AnnieAPI.getWeekSchedule().then((schedules) => {
      dispatch(setSchedules(schedules));
      dispatch(setLoading(false));
    });
  }

  authenticationHelper.auth.onAuthStateChanged((user) => {
    if (user === null) {
      dispatch(login(false));
    } else {
      preloadData();
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
