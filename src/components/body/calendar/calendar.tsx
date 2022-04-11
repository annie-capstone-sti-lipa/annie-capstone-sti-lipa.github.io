import { useState } from "react";
import "./calendar.scss";

enum view {
  monthView,
  weekView,
}

export default function Calendar() {
  const [selectedView, setSelectedView] = useState(view.monthView);
  const [selectedWeek, setSelectedWeek] = useState<Array<string>>();

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

  const _setSelectedView = (view: view) => setSelectedView(() => view);
  const _setSelectedWeek = (week: Array<string>) => setSelectedWeek(() => week);

  function viewSwitch() {
    switch (selectedView) {
      case view.weekView:
        return <WeekView daysInWeek={daysInWeek} selectedWeek={selectedWeek} />;
      default:
        return (
          <MonthView
            firstDay={firstDay}
            daysThisMonth={daysThisMonth}
            daysInWeek={daysInWeek}
            setSelectedView={_setSelectedView}
            setSelectedWeek={_setSelectedWeek}
          />
        );
    }
  }

  return (
    <div className="calendar">
      <div className="title-container">
        <span className="title">April, Spring 2022</span>
      </div>
      <div className="view-container">{viewSwitch()}</div>
    </div>
  );
}

function WeekView({
  daysInWeek,
  selectedWeek,
}: {
  daysInWeek: Array<string>;
  selectedWeek?: Array<string>;
}) {
  return (
    <table className="week-view">
      <thead>
        <tr className="week-header">
          {daysInWeek.map((day, index) => (
            <th className="week-day" key={`${day} ${index}`}>
              <div className="day-name">{day}</div>
              <div className="day-date-container">
                <div className="day-date">
                  {selectedWeek![index].length === 0
                    ? "_"
                    : selectedWeek![index]}
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  );
}

function MonthView({
  firstDay,
  daysThisMonth,
  daysInWeek,
  setSelectedView,
  setSelectedWeek,
}: {
  firstDay: number;
  daysThisMonth: number;
  daysInWeek: Array<string>;
  setSelectedView: (view: view) => void;
  setSelectedWeek: (week: Array<string>) => void;
}) {
  function days() {
    let daysArr: Array<string> = [];
    let dayElements = [];

    for (let i = 0; i < firstDay; i++) daysArr.push("_");
    for (let i = 0; i < daysThisMonth; i++) daysArr.push((i + 1).toString());

    function getRow() {
      let row = [];

      for (let i = 0; i < daysInWeek.length; i++) {
        row.push(
          <DayCardMonth
            day={daysArr.shift()!.toString()}
            key={daysArr.length}
          />
        );
      }

      return row;
    }

    while (daysArr.length !== 0) {
      let current = daysArr.slice(0, daysInWeek.length);

      dayElements.push(
        <tr
          className="week-row"
          onClick={() => {
            setSelectedWeek(current);
            setSelectedView(view.weekView);
          }}
          key={`week-row ${daysArr.length}`}
        >
          {getRow()}
        </tr>
      );
    }

    return dayElements;
  }

  return (
    <table className="month-view">
      <thead>
        <tr>
          {daysInWeek.map((day, index) => (
            <WeekDay day={day} key={day + index} />
          ))}
        </tr>
      </thead>
      <tbody>{days()}</tbody>
    </table>
  );
}

function WeekDay({ day }: { day: string }) {
  return <th className="week-day">{day}</th>;
}

function DayCardMonth({ day }: { day: string }) {
  return <td className="day-card-month">{day}</td>;
}

function DayCardWeek({ day }: { day: string }) {
  return <td className="day-card-week">{day}</td>;
}
