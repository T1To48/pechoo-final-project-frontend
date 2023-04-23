import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddIcon from "@mui/icons-material/Add";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeliveryDiningRoundedIcon from "@mui/icons-material/DeliveryDiningRounded";
import { useTheme } from "@emotion/react";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import MapIcon from '@mui/icons-material/Map';
import OnlinePredictionRoundedIcon from "@mui/icons-material/OnlinePredictionRounded";
import InputRoundedIcon from "@mui/icons-material/InputRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import { Typography } from "@mui/material";

import { useSelector } from "react-redux";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function BottomNavBar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    // Update the active tab state when the location pathname changes
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const theme = useTheme();

  const { isLoggedIn, loggedUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: "1.7rem",
        borderTopRightRadius: "1.7rem",
        height: window.innerHeight * 0.11,
        backgroundColor: theme.palette.primary.black,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: isLoggedIn ? "space-around" : "space-around",
          height: window.innerHeight * 0.3,
          // mx: 1,
        }}
      >
        {isLoggedIn ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => navigate("/published-orders")}
            >
              <HistoryRoundedIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => navigate("/active-user-orders")} color="inherit" aria-label="open drawer">
              <OnlinePredictionRoundedIcon fontSize="large" />
            </IconButton>

            <div style={{width:"10px"}} />
            <StyledFab  onClick={() => navigate("/published-orders")} color="primary" sx={{ marginTop: "10px" }}>
              <DeliveryDiningRoundedIcon fontSize="large" />
            </StyledFab>

            <IconButton color="inherit">
              <MapIcon fontSize="large" />
            </IconButton>
            <IconButton color="inherit">
              <PersonRoundedIcon fontSize="large" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              sx={{
                flexDirection: "column",
                color:
                  activeTab === "/register"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.buttonText,
              }}
              onClick={() => navigate("/register")}
              disableRipple
            >
              <BorderColorRoundedIcon fontSize="medium" />
              <Typography fontSize="small" fontWeight="700">
                Register
              </Typography>
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                flexDirection: "column",
                color:
                  activeTab === "/tracking-map"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.buttonText,
              }}
              // onClick={() => navigate("/tracking-map")}
              disableRipple
            >
              <PinDropRoundedIcon fontSize="medium" />
              <Typography fontSize="small" fontWeight="700">
                Track
              </Typography>
            </IconButton>

            <IconButton
              color="inherit"
              sx={{
                flexDirection: "column",
                color:
                  activeTab === "/login"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.buttonText,
              }}
              onClick={() => navigate("/login")}
              disableRipple
            >
              <InputRoundedIcon fontSize="medium" />
              <Typography fontSize="small" fontWeight="700">
                Login
              </Typography>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
