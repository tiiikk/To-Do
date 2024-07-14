import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "../features/drawer/drawerSlice.ts";
import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
