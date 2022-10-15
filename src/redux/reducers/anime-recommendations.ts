import { createSlice } from "@reduxjs/toolkit";
import AnimeItem from "../../types/anime-item";

export const animeRecommendationsSlice = createSlice({
  name: "animeRecommendations",
  initialState: {
    animes: [] as Array<AnimeItem>,
    isLoading: false,
  },
  reducers: {
    setAnimes: (state, action) => {
      state.animes = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAnimes, setLoading } = animeRecommendationsSlice.actions;

export default animeRecommendationsSlice.reducer;
