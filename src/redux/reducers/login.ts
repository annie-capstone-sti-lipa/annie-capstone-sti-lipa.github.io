import { createSlice } from "@reduxjs/toolkit";
import tempPfp from "../../assets/icons/temp_pfp.svg";

export const loginSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    isLoggedIn: null,
    user: null,
    image: tempPfp,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    updateImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { login, updateImage } = loginSlice.actions;

export default loginSlice.reducer;
