import { useSelector } from "react-redux";
import tabnavItem from "../../types/enums/tabnavItem";
import "./body.scss";
import Calendar from "./calendar/calendar";
import Recommendations from "./recommendations/recommendations";
import SauceFinder from "./sauce-finder/sauce-finder";
import Quiz from "./quiz/quiz";
import Account from "../account/account";

export default function Body() {
  const selected = useSelector((state: any) => state.tabnav.selected);

  function bodySwitch() {
    switch (selected) {
      case tabnavItem.account:
        return <Account />;
      case tabnavItem.sauceFinder:
        return <SauceFinder />;
      case tabnavItem.calendar:
        return <Calendar />;
      case tabnavItem.recommendations:
        return <Recommendations />;
      case tabnavItem.quiz:
        return <Quiz />;
      // case tabnavItem.codeVault:
      //   return <CodeVault />;
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
