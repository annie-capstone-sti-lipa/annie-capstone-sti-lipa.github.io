import { createSlice } from "@reduxjs/toolkit";
import tabnavItem from "../../types/enums/tabnavItem";

export const tabnavSlice = createSlice({
  name: "tabnav",
  initialState: {
    selected: tabnavItem.codeVault,
  },
  reducers: {
    select: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { select } = tabnavSlice.actions;

export default tabnavSlice.reducer;
