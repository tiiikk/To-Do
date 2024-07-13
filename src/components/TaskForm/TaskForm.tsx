import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Button } from "@mui/material";

export default function TaskForm() {
  const [date, setDate] = useState<undefined | string>(undefined);
  const [title, setTitle] = useState<undefined | string>(null);
  const [description, setDescription] = useState<undefined | string>(null);

  const handleFormSubmit = () => {
    const task = [];
    if (!title) {
      alert("Please Fill in a title!");
    } else {
      task.push(title, description, date);
      const existingTasks = localStorage.getItem("Tasks");
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      tasksArray.push(task);
      localStorage.setItem("Tasks", JSON.stringify(tasksArray));
      setTitle("");
      setDate(undefined);
      setDescription("");
    }
  };
  return (
    <Box
      sx={{
        width: 350,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
      role="presentation"
    >
      <Typography variant="h4" color={"#2c387e"}>
        New Task
      </Typography>
      <Input
        value={title}
        fullWidth={true}
        multiline={true}
        placeholder={"Task title"}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FilledInput
        value={description}
        fullWidth={true}
        multiline={true}
        placeholder={"Short description of the task"}
        color="primary"
        onChange={(e) => setDescription(e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Task Deadline"
          value={date}
          onChange={(newValue) => setDate(newValue)}
        />
      </LocalizationProvider>
      <Button onClick={handleFormSubmit} type={"submit"} variant="contained">
        Create!
      </Button>
    </Box>
  );
}
