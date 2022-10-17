import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    isLoggedIn: null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
  },
});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
