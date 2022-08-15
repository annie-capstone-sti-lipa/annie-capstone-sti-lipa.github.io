
import "./loader.scss";

export function MiniLoader() {
  return (
    <div className="loader-container">
      <div className="mini-loader" />
    </div>
  );
}

export function Loader() {
  return (
    <div className="loader-container">
      <div className="loader" />
    </div>
  );
}