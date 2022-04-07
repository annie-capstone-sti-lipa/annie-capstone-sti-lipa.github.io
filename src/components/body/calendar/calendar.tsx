import { useState } from "react";
import "./calendar.scss";

enum view {
  monthView,
  weekView,
}

export default function Calendar() {
  const [selectedView, setSelectedView] = useState(view.monthView);

  let today = new Date();
  let firstDay = new Date(today.getFullYear(), today.getMonth()).getDay();
  let daysThisMonth =
    32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();

  let daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function viewSwitch() {
    switch (selectedView) {
      case view.weekView:
        return <WeekView />;
      default:
        return (
          <MonthView
            firstDay={firstDay}
            daysThisMonth={daysThisMonth}
            daysInWeek={daysInWeek}
          />
        );
    }
  }

  return (
    <div className="calendar">
      <div className="title">April, Spring 2022</div>
      {viewSwitch()}
    </div>
  );
}

function WeekView() {
  return <div className="week-view">sunday</div>;
}

function MonthView({
  firstDay,
  daysThisMonth,
  daysInWeek,
}: {
  firstDay: number;
  daysThisMonth: number;
  daysInWeek: Array<string>;
}) {
  function days() {
    let daysArr: Array<string | number> = [];
    let dayElements = [];

    for (let i = 0; i < firstDay; i++) daysArr.push("");
    for (let i = 0; i < daysThisMonth; i++) daysArr.push(i + 1);

    function getRow() {
      let row = [];

      for (let i = 0; i < daysInWeek.length; i++) {
        row.push(
          <DayCard day={daysArr.shift()!.toString()} key={daysArr.length} />
        );
      }

      return row;
    }

    while (daysArr.length !== 0) {
      console.log(daysArr.length);
      dayElements.push(<tr>{getRow()}</tr>);
    }

    return dayElements;
  }

  return (
    <table className="month-view">
      <tr>
        {daysInWeek.map((day, index) => (
          <WeekDay day={day} key={day + index} />
        ))}
      </tr>
      {days()}
    </table>
  );
}

function WeekDay({ day }: { day: string }) {
  return <th className="week-day">{day}</th>;
}

function DayCard({ day }: { day: string }) {
  return <td className="day-card">{day}</td>;
}
