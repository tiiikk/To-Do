import { createSlice } from "@reduxjs/toolkit";

export interface drawerState {
  value: boolean;
}

const initialState: drawerState = {
  value: false,
};

export const drawerSlice = createSlice({
  name: "drawerHandler",
  initialState,
  reducers: {
    open: (state) => {
      state.value = true;
    },
    close: (state) => {
      state.value = false;
    },
  },
});

export const { open, close } = drawerSlice.actions;

export default drawerSlice.reducer;
