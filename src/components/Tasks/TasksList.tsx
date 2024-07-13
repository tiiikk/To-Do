import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function TasksList({ tasks }) {
  return (
    <React.Fragment>
      {tasks.map((task, index) => (
        <Card
          raised={true}
          variant="outlined"
          key={index}
          sx={{ marginBottom: 2 }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              {task[0]}
            </Typography>
            <Typography variant="h5" component="h2">
              {task[1]}
            </Typography>
            <Typography variant="h5" component="h2">
              {task[2]}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  );
}
