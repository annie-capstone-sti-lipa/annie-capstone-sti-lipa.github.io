import { configureStore } from "@reduxjs/toolkit";
import animeSchedulesReducer from "./reducers/anime-schedules";
import loginReducer from "./reducers/login";
import tabnavItemReducer from "./reducers/tabnav-item-reducer";
import animeRecommendationsReducer from "./reducers/anime-recommendations";

export default configureStore({
  reducer: {
    tabnav: tabnavItemReducer,
    isLoggedIn: loginReducer,
    animeSchedules: animeSchedulesReducer,
    animeRecommendations: animeRecommendationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
