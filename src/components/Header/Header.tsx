import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { open } from "../../features/drawer/drawerSlice.ts";

export default function ButtonAppBar() {
  const [currentDate, setCurrentDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getDate = () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      setCurrentDate(`${date}/${month}/${year}`);
    };

    getDate();
  }, []);
  const dispatch = useDispatch();
  const handleMenuDrawer = () => {
    dispatch(open());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#2c387e" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CreateIcon onClick={handleMenuDrawer} />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentDate}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
