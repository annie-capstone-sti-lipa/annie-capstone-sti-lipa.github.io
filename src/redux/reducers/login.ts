import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    value: false,
  },
  reducers: {
    select: (state, action) => {
      state = action.payload;
    },
  },
});

export const { select } = loginSlice.actions;

export default loginSlice.reducer;
