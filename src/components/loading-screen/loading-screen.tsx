import { Loader } from "../general/loader/loader";
import "./loading-screen.scss";

function LoadingScreen() {
  return (
    <div id="loading-screen">
      <Loader></Loader>
      <p>Please Wait...</p>
    </div>
  );
}

export default LoadingScreen;
