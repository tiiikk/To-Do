import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { close } from "../../features/drawer/drawerSlice.ts";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm.tsx";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.drawer.value);

  const handleClose = () => () => {
    dispatch(close());
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={handleClose()}></Box>
  );

  return (
    <Drawer open={isOpen} onClose={handleClose()}>
      {DrawerList}
      <CloseIcon
        sx={{ marginLeft: "auto", padding: "1rem", cursor: "pointer" }}
        onClick={handleClose()}
      />
      <TaskForm />
    </Drawer>
  );
}
