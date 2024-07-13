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

export default function TasksList({ tasks }) {
  const [isEditOpen, setIsEditOpen] = useState(true);
  const [editIndex, setEditIndex] = useState(undefined);
  const [date, setDate] = useState<undefined | string>(undefined);

  const handleEditIndex = (index) => {
    setEditIndex(index);
  };

  const handleSave = () => {
    setEditIndex(null);
  };
  const handleEditClose = () => {
    setEditIndex(null);
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
                {task[0]}
              </Typography>
            ) : (
              <Input
                defaultValue={task[0]}
                fullWidth={true}
                multiline={true}
                placeholder={"Task title"}
              />
            )}
            {isEditOpen && editIndex !== index ? (
              <Typography variant="p" component="h2">
                {task[1]}
              </Typography>
            ) : (
              <Input
                defaultValue={task[1]}
                fullWidth={true}
                multiline={true}
                placeholder={"Task title"}
              />
            )}
            {isEditOpen && editIndex !== index ? (
              <Typography fontStyle="italic" variant="h5" component="h2">
                {task[2].split("T")[0]}
              </Typography>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Task Deadline"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
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
                <DoneAllIcon sx={{ cursor: "pointer" }} />
                <CloseIcon
                  sx={{ padding: "1rem", cursor: "pointer" }}
                  onClick={() => handleEditIndex(null)}
                />
              </>
            )}
            <DeleteIcon sx={{ cursor: "pointer" }} />
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  );
}
