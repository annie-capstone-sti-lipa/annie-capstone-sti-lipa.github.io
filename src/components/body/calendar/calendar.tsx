import { useState } from "react";
import "./calendar.scss";

import backIcon from "../../../assets/icons/back.svg";
import AnimeCard from "../../general/anime-card/anime-card";
import animeType from "../../../types/enums/anime-type";

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
        {selectedView === view.weekView ? (
          <div
            className="back-button"
            onClick={() => _setSelectedView(view.monthView)}
          >
            <img className="back-icon" src={backIcon} alt="back" />
          </div>
        ) : (
          <span></span>
        )}
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
      <thead className="week-header">
        <tr>
          {daysInWeek.map((day, index) => (
            <th className="week-day" key={`${day} ${index}`}>
              <div className="day-name">{day}</div>
              <div className="day-date-container">
                <div
                  className={`day-date ${
                    selectedWeek![index] === new Date().getDate().toString()
                      ? "today"
                      : ""
                  }`}
                >
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
        <tr className="anime-scheds">
          {selectedWeek!.map((day, index) => (
            <td key={`${day} ${index}`}>
              {Array(Math.floor(Math.random() * (3 - 0) + 0))
                .fill("")
                .map((_, index) => {
                  return <AnimeCard type={animeType.watching} key={index} />;
                })}
            </td>
          ))}
        </tr>
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
        let day = daysArr.shift()!.toString();
        row.push(
          <DayCardMonth
            day={day}
            key={daysArr.length}
            isToday={new Date().getDate().toString() === day}
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

function DayCardMonth({ day, isToday }: { day: string; isToday: boolean }) {
  return (
    <td className={`day-card-month-container `}>
      <div className={`day-card-month ${isToday ? "today" : ""}`}>{day}</div>
    </td>
  );
}
