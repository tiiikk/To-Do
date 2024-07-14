import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("Tasks")) || [],
  deletedTasks: JSON.parse(localStorage.getItem("DeletedTasks")) || [], // Initialize deletedTasks from localStorage
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
      const deletedTask = state.tasks[action.payload];
      state.deletedTasks.push(deletedTask);
      state.tasks.splice(action.payload, 1);
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
      localStorage.setItem("DeletedTasks", JSON.stringify(state.deletedTasks));
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
