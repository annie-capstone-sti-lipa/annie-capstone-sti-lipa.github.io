import { useSelector } from "react-redux";
import tabnavItem from "../../types/enums/tabnavItem";
import "./body.scss";
import SauceFinder from "./sauce-finder/sauce-finder";

export default function Body() {
  const selected = useSelector((state: any) => state.tabnav.selected);

  function bodySwitch() {
    switch (selected) {
      case tabnavItem.sauceFinder:
        return <SauceFinder />;
      default:
        return <div>{selected}</div>;
    }
  }

  return (
    <div className="container">
      <div id="body">{bodySwitch()}</div>
    </div>
  );
}
