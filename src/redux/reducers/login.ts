import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    isLoggedIn: null,
    user: null,
    image: null,
    userInfo: null,
    quizScores: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    updateImage: (state, action) => {
      state.image = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    updateScores: (state, action) => {
      state.quizScores = action.payload;
    },
  },
});

export const { login, updateImage, updateUserInfo, updateScores } =
  loginSlice.actions;

export default loginSlice.reducer;
