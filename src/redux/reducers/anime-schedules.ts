import { createSlice } from "@reduxjs/toolkit";
import { DaySchedules } from "../../types/day-schedules";

export const animeSchedulesSlice = createSlice({
  name: "animeSchedules",
  initialState: {
    schedules: [] as Array<DaySchedules>,
  },
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
  },
});

export const { setSchedules } = animeSchedulesSlice.actions;

export default animeSchedulesSlice.reducer;
