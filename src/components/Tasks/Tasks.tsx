import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../features/drawer/drawerSlice.ts";
import { useEffect, useState } from "react";
import TaskCreateCard from "./TaskCreateCard.tsx";
import TasksList from "./TasksList.tsx";
import { setTasks } from "../../features/tasks/tasksSlice";

export default function OutlinedCard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleAddTask = () => {
    dispatch(open());
  };

  useEffect(() => {
    const localStorageTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    dispatch(setTasks(localStorageTasks));
  }, [dispatch]);

  return (
    <Box sx={{ minWidth: 275 }} padding={5}>
      {tasks && tasks.length > 0 ? (
        <TasksList tasks={tasks} />
      ) : (
        <TaskCreateCard handleAddTask={handleAddTask} />
      )}
    </Box>
  );
}
