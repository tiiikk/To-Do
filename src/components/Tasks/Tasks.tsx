import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { open } from "../../features/drawer/drawerSlice.ts";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
  });
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
