import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    value: false,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
