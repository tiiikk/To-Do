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
import {
  deleteTask,
  updateTask,
  completeTask,
} from "../../features/tasks/tasksSlice.ts";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

const TasksList = ({ tasks, editIcons = true }) => {
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

  const handleCompleteTask = (index) => {
    dispatch(completeTask(index));
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
            ...(task.status === "pending" && {
              "&:hover": {
                backgroundColor: "#eb6734",
                cursor: "pointer",
              },
            }),
            ...(task.status === "overdue" && {
              "&:hover": {
                backgroundColor: "#b81212",
                cursor: "pointer",
              },
            }),
            ...(task.status === "completed" && {
              "&:hover": {
                backgroundColor: "#81b812",
                cursor: "pointer",
              },
            }),
          }}
        >
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Typography color={"#2c387e"} variant="h4" component="h2">
              {task.title}
            </Typography>
            <Typography variant="body1" component="h2">
              {task.description || "No description"}
            </Typography>
            <Typography fontStyle="italic" variant="h5" component="h2">
              {formatDate(task.date) || "No date"}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color={
                task.status === "overdue"
                  ? "error"
                  : task.status === "pending"
                    ? "#eb6734"
                    : task.status === "removed"
                      ? "textprimary"
                      : "#81b812"
              }
            >
              Status: {task.status}
            </Typography>
            {task.status === "pending" && (
              <Button
                color="success"
                variant="contained"
                onClick={() => handleCompleteTask(index)}
              >
                Complete!
              </Button>
            )}
          </CardContent>
          {editIcons && (
            <CardContent
              sx={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {isEditOpen &&
              task.status !== "completed" &&
              editIndex !== index ? (
                <CreateIcon
                  onClick={() => handleEditIndex(index)}
                  sx={{ cursor: "pointer" }}
                />
              ) : (
                isEditOpen &&
                task.status !== "completed" && (
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
                )
              )}
              <DeleteIcon
                onClick={() => handleDeleteTask(index)}
                sx={{ cursor: "pointer" }}
              />
            </CardContent>
          )}
        </Card>
      ))}
    </React.Fragment>
  );
};

export default TasksList;
