import "./loader.scss";

export function MiniLoader() {
  return (
    <div className="loader-container">
      <div className="mini-loader" />
    </div>
  );
}

export function Loader({ show = true }: { show?: boolean }) {
  if (!show) {
    return <span></span>;
  }

  return (
    <div className="loader-container">
      <div className="loader" />
    </div>
  );
}
