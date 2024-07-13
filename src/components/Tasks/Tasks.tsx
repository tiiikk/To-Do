import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../features/drawer/drawerSlice.ts";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function OutlinedCard() {
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(open());
  };
  return (
    <Box sx={{ minWidth: 275 }} padding={5}>
      <Card variant="outlined">
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
    </Box>
  );
}
