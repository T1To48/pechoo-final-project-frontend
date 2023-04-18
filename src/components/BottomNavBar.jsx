import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto"
});

export default function BottomNavBar() {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: "auto",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        height: window.innerHeight * 0.1
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 5,
          height: window.innerHeight * 0.3
        }}
      >
        <IconButton color="inherit" aria-label="open drawer">
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="open drawer">
          <SearchIcon />
        </IconButton>

        <StyledFab color="secondary" aria-label="add">
          <AddIcon sx={{ paddingTop: "px" }} />
        </StyledFab>

        <IconButton color="inherit">
          <SearchIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
