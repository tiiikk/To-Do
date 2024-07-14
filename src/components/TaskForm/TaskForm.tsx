import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/tasks/tasksSlice";

export interface TASK {
  title: string;
  description: string | undefined;
  date?: string | null;
}
export default function TaskForm() {
  const [date, setDate] = useState<undefined | string>(undefined);
  const [title, setTitle] = useState<undefined | string>(null);
  const [description, setDescription] = useState<undefined | string>(null);
  const dispatch = useDispatch();

  const handleFormSubmit = () => {
    if (!title) {
      alert("Please fill in a title!");
      return;
    }
    const task: TASK = {
      title,
      description,
      date: date ? JSON.stringify(date.$d) : null,
    };

    dispatch(addTask(task));

    // Clear the form
    setTitle("");
    setDescription("");
    setDate(null);
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
          onChange={(newValue) => setDate(newValue)}
        />
      </LocalizationProvider>
      <Button onClick={handleFormSubmit} type={"submit"} variant="contained">
        Create!
      </Button>
    </Box>
  );
}
