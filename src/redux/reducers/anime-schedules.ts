import { createSlice } from "@reduxjs/toolkit";
import { DaySchedules } from "../../types/day-schedules";

export const animeSchedulesSlice = createSlice({
  name: "animeSchedules",
  initialState: {
    schedules: [] as Array<DaySchedules>,
    isLoading: false,
  },
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    setLoading: (state, action) => {
      console.log("changed to " + action.payload);
      state.isLoading = action.payload;
    },
  },
});

export const { setSchedules, setLoading } = animeSchedulesSlice.actions;

export default animeSchedulesSlice.reducer;
