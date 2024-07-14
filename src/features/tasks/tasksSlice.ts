import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("Tasks")),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const { index, task } = action.payload;
      state.tasks[index] = task;
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
