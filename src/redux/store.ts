import { configureStore } from "@reduxjs/toolkit";
import animeSchedulesReducer from "./reducers/anime-schedules";
import loginReducer from "./reducers/login";
import tabnavItemReducer from "./reducers/tabnav-item-reducer";

export default configureStore({
  reducer: {
    tabnav: tabnavItemReducer,
    isLoggedIn: loginReducer,
    animeSchedules: animeSchedulesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
