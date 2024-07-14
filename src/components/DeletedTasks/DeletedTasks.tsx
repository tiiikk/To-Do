import * as React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TasksList from "../Tasks/TasksList.tsx";

const DeletedTasks: React.FC = () => {
  const deletedTasks = useSelector((state) => state.tasks.deletedTasks);
  const [trashOpen, setTrashOpen] = React.useState<Boolean>(false);

  const handleTrashClick = () => {
    setTrashOpen(!trashOpen);
  };

  return (
    deletedTasks.length > 0 && (
      <Box
        component="section"
        sx={{ display: "flex", flexDirection: "column", padding: "2.5rem" }}
      >
        <IconButton
          onClick={handleTrashClick}
          aria-label="delete"
          size="large"
          color="primary"
        >
          {trashOpen ? (
            <DeleteOutlinedIcon fontSize="inherit" />
          ) : (
            <DeleteIcon fontSize="inherit" />
          )}
        </IconButton>
        {trashOpen && <TasksList tasks={deletedTasks} editIcons={false} />}
      </Box>
    )
  );
};

export default DeletedTasks;
