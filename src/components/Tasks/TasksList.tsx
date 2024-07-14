import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { deleteTask, updateTask } from "../../features/tasks/tasksSlice.ts";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

export default function TasksList({ tasks }) {
  const [isEditOpen, setIsEditOpen] = useState(true);
  const [editIndex, setEditIndex] = useState(undefined);
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch();

  const handleEditIndex = (index) => {
    setEditIndex(index);
    setTitle(tasks[index].title);
    setDescription(tasks[index].description || "");
    setDate(tasks[index].date ? dayjs(tasks[index].date) : null);
  };

  const handleEditSubmit = (index) => {
    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }

    const newTitle = title !== undefined ? title : tasks[index].title;
    const newDescription =
      description !== undefined ? description : tasks[index].description;
    const newDate = date ? date.format("YYYY-MM-DD") : tasks[index].date;

    const updatedTask = {
      title: newTitle,
      description: newDescription,
      date: newDate,
    };
    dispatch(updateTask({ index, task: updatedTask }));

    setEditIndex(null);
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = dayjs(dateString);
    if (!date.isValid()) return "";
    return date.format("YYYY-MM-DD");
  };

  return (
    <React.Fragment>
      {tasks.map((task, index) => (
        <Card
          raised={true}
          variant="outlined"
          key={index}
          sx={{
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {isEditOpen && editIndex !== index ? (
              <Typography color={"#2c387e"} variant="h4" component="h2">
                {task.title}
              </Typography>
            ) : (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth={true}
                multiline={true}
                placeholder={"Task title"}
              />
            )}
            {isEditOpen && editIndex !== index ? (
              <Typography variant="p" component="h2">
                {task.description}
              </Typography>
            ) : (
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth={true}
                multiline={true}
                placeholder={"Task description"}
              />
            )}
            {isEditOpen && editIndex !== index ? (
              <Typography fontStyle="italic" variant="h5" component="h2">
                {formatDate(task.date)}
              </Typography>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Task Deadline"
                  value={date}
                  onChange={(newValue) =>
                    setDate(newValue ? newValue.startOf("day") : null)
                  }
                  renderInput={(params) => <Input {...params} />}
                />
              </LocalizationProvider>
            )}
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {isEditOpen && editIndex !== index ? (
              <CreateIcon
                onClick={() => handleEditIndex(index)}
                sx={{ cursor: "pointer" }}
              />
            ) : (
              <>
                <DoneAllIcon
                  onClick={() => handleEditSubmit(index)}
                  sx={{ cursor: "pointer" }}
                />
                <CloseIcon
                  sx={{ padding: "1rem", cursor: "pointer" }}
                  onClick={() => handleEditIndex(null)}
                />
              </>
            )}
            <DeleteIcon
              onClick={() => handleDeleteTask(index)}
              sx={{ cursor: "pointer" }}
            />
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  );
}
