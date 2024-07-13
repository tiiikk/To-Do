import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "../features/drawer/drawerSlice.ts";
export const store = configureStore({
  reducer: {
    counter: drawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
