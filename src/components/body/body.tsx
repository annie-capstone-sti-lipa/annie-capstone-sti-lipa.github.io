import { useSelector } from "react-redux";
import tabnavItem from "../../types/enums/tabnavItem";
import "./body.scss";
import Calendar from "./calendar/calendar";
import Recommendations from "./recommendations/recommendations";
import SauceFinder from "./sauce-finder/sauce-finder";

export default function Body({ noPadding }: { noPadding?: boolean }) {
  const selected = useSelector((state: any) => state.tabnav.selected);

  function bodySwitch() {
    switch (selected) {
      case tabnavItem.sauceFinder:
        return <SauceFinder />;
      case tabnavItem.calendar:
        return <Calendar />;
      case tabnavItem.recommendations:
        return <Recommendations />;
      default:
        return <div>{selected}</div>;
    }
  }

  return (
    <div className="container">
      <div id="body" style={{ padding: `${noPadding ? "0px" : ""}` }}>
        {bodySwitch()}
      </div>
    </div>
  );
}
