import { createSlice } from "@reduxjs/toolkit";

export const imageDialogSlice = createSlice({
  name: "imageDialog",
  initialState: {
    value: false,
  },
  reducers: {
    show: (state, action) => (state.value = action.payload),
  },
});

export const { show } = imageDialogSlice.actions;

export default imageDialogSlice.reducer;
