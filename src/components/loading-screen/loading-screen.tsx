import { useDispatch, useSelector } from "react-redux";
import { authenticationHelper } from "../../App";
import { Loader } from "../general/loader/loader";
import { login } from "../../redux/reducers/login";
import "./loading-screen.scss";
import { setLoading, setSchedules } from "../../redux/reducers/anime-schedules";
import AnnieAPI from "../../helpers/annie-api";
import { useEffect } from "react";

function LoadingScreen() {
  const isLoading = useSelector((state: any) => state.animeSchedules.isLoading);
  const dispatch = useDispatch();

  async function preloadData() {
    dispatch(setLoading(true));
    if (!isLoading) {
      await AnnieAPI.getWeekSchedule().then((schedules) => {
        dispatch(setSchedules(schedules));
        dispatch(setLoading(false));
      });
    }
  }

  useEffect(() => {
    preloadData();
  }, []);

  const unsubscribe = authenticationHelper.auth.onAuthStateChanged(
    async (user) => {
      if (user === null) {
        dispatch(login(false));
      } else {
        dispatch(login(true));
      }
      unsubscribe();
    }
  );

  return (
    <div id="loading-screen">
      <Loader></Loader>
      <p>Please Wait...</p>
    </div>
  );
}

export default LoadingScreen;
