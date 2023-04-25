// import React from 'react'

// const LandingPage = () => {
//   return (
//     <h1 >LandingPage</h1>
//   )
// }

// export default LandingPage


import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to FoodEase
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Making Food Delivery Easier
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
