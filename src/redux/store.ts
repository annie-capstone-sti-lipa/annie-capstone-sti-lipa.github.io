import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/login";
import tabnavItemReducer from "./reducers/tabnav-item-reducer";

export default configureStore({
  reducer: {
    tabnav: tabnavItemReducer,
    isLoggedIn: loginReducer,
  },
});
