import { useEffect, useState } from "react";
import "./calendar.scss";

import backIcon from "../../../assets/icons/back.svg";
import AnimeCard from "../../general/anime-card/anime-card";
import animeType from "../../../types/enums/anime-type";
import { DaySchedules } from "../../../types/day-schedules";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../general/loader/loader";
import {
  setLoading,
  setSchedules,
} from "../../../redux/reducers/anime-schedules";
import sortCategory from "../../../types/enums/sort-by";
import AnnieAPI from "../../../helpers/annie-api";

enum view {
  monthView,
  weekView,
}

export default function Calendar() {
  const schedules = useSelector((state: any) => state.animeSchedules.schedules);
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
        return (
          <WeekView
            daysInWeek={daysInWeek}
            selectedWeek={selectedWeek}
            schedules={schedules ?? []}
          />
        );
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
        <span className="title">
          {new Date().toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="view-container">{viewSwitch()}</div>
    </div>
  );
}

function WeekView({
  daysInWeek,
  selectedWeek,
  schedules,
}: {
  daysInWeek: Array<string>;
  selectedWeek?: Array<string>;
  schedules: Array<DaySchedules>;
}) {
  const [sortBy, setSortBy] = useState<sortCategory>(sortCategory.rating);
  const [scheds, setScheds] = useState(schedules);

  const isLoading = useSelector((state: any) => state.animeSchedules.isLoading);
  const dispatch = useDispatch();

  while (selectedWeek?.length !== 7) {
    selectedWeek?.push("_");
  }

  useEffect(() => {
    let newScheds: Array<DaySchedules> = [];
    schedules.forEach((day: DaySchedules, dayIndex: number) => {
      if (sortBy === sortCategory.rating) {
        let sortedAnimes = day.animes.sort((a, b) => b.score - a.score);
        newScheds.push(new DaySchedules(day.day, sortedAnimes));
      }
      if (sortBy === sortCategory.popularity) {
        let sortedAnimes = day.animes.sort((a, b) => {
          return a.popularity - b.popularity;
        });
        newScheds.push(new DaySchedules(day.day, sortedAnimes));
      }
    });
    setScheds(newScheds);
  }, [sortBy, schedules]);

  useEffect(() => {
    dispatch(setLoading(false));
    if (scheds.length === 0) {
      dispatch(setLoading(true));
      AnnieAPI.getWeekSchedule()
        .then((schedules) => {
          dispatch(setSchedules(schedules));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [scheds.length, dispatch]);

  return (
    <>
      {/* isLoading?<Loader show={isLoading}></Loader> */}
      <div className="sort-by">
        <span className="title">Sort by:</span>
        <select
          name="sort-by"
          id=""
          defaultValue={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value as sortCategory);
          }}
        >
          <option value={sortCategory.rating}>rating</option>
          <option value={sortCategory.popularity}>popularity</option>
        </select>
      </div>
      {isLoading ? (
        <Loader show={isLoading}></Loader>
      ) : (
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
              {selectedWeek!.map((day, index) => {
                return (
                  <td key={`${day} ${index}`}>
                    {scheds
                      ?.find(
                        (element) =>
                          element.day.toLowerCase() ===
                          daysInWeek[index].toLowerCase()
                      )
                      ?.animes.map((anime, index) => {
                        return (
                          <AnimeCard
                            type={animeType.watching}
                            animeItem={anime}
                            key={index}
                          />
                        );
                      })}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      )}
    </>
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
        if (daysArr.length === 0) break;

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
