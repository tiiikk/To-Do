import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { open } from "../../features/drawer/drawerSlice.ts";
import { useEffect, useState } from "react";

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
        <React.Fragment>
          {tasks.map((task, index) => (
            <Card variant="outlined" key={index} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {task}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </React.Fragment>
      ) : (
        <Card>
          <React.Fragment>
            <CardContent
              sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <Fab
                onClick={handleAddTask}
                size="small"
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
              <Typography variant="h5" component="h2">
                Click to create your first Task!!
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      )}
    </Box>
  );
}
