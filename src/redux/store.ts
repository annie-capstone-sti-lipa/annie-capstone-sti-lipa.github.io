import { configureStore } from "@reduxjs/toolkit";
import tabnavItemReducer from "./reducers/tabnav-item-reducer";

export default configureStore({
  reducer: {
    tabnav: tabnavItemReducer,
  },
});
