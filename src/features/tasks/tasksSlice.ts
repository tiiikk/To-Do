import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("Tasks")) || [],
  deletedTasks: JSON.parse(localStorage.getItem("DeletedTasks")) || [],
};

const getStatus = (task) => {
  if (task.status === "completed") return "completed";
  const now = dayjs();
  const taskDate = dayjs(task.date);
  return taskDate.isBefore(now, "day") ? "overdue" : "pending";
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.map((task) => ({
        ...task,
        status: getStatus(task),
      }));
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    addTask: (state, action) => {
      const task = {
        ...action.payload,
        status: getStatus(action.payload),
      };
      state.tasks.push(task);
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const { index, task } = action.payload;
      state.tasks[index] = {
        ...task,
        status: getStatus(task),
      };
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      const deletedTask = {
        ...state.tasks[action.payload],
        status: "removed",
      };
      state.deletedTasks.push(deletedTask);
      state.tasks.splice(action.payload, 1);
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
      localStorage.setItem("DeletedTasks", JSON.stringify(state.deletedTasks));
    },
    completeTask: (state, action) => {
      state.tasks[action.payload].status = "completed";
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, completeTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
