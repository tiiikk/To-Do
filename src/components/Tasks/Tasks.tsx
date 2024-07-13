import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { open } from "../../features/drawer/drawerSlice.ts";
import { useEffect, useState } from "react";
import TaskCreateCard from "./TaskCreateCard.tsx";
import TasksList from "./TasksList.tsx";

export default function OutlinedCard() {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    dispatch(open());
  };

  const localStorageTasks = JSON.parse(localStorage.getItem("Tasks"));
  useEffect(() => {
    setTasks(localStorageTasks);
  }, []);

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
