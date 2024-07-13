import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function TaskCreateCard({ handleAddTask }) {
  return (
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
  );
}
