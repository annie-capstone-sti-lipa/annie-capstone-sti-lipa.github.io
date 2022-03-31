import { configureStore } from "@reduxjs/toolkit";
import imageDialogReducer from "./reducers/image-dialog-reducer";

export default configureStore({
  reducer: {
    imageDialog: imageDialogReducer,
  },
});
