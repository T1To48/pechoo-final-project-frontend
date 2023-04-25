import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { resetBing } from "../features/BingMapsApi/bingSlice.jsx";
import { register, reset } from "../features/users/userSlice.jsx";
import AddressForm from "../components/AddressForm.jsx";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SimpleDialog from "../components/Common/SimpleDialog.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function RegisterMUI() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    userType: "",
    address: "",
    coords: "",
  });
  const { name, email, phone, password, userType, address } = registerDetails;

  const targetName = "userType";
  const typeOfUser = ["Restaurant", "Driver"];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addressName, addressCoords } = useSelector((state) => state.bing);

  useEffect(() => {
    setRegisterDetails({
      ...registerDetails,
      coords: addressCoords,
      address: addressName,
    });
  }, [addressName, addressCoords]);

  const { loggedUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      alert(`ERROR While Registering ${message}`);
    }
    if (isSuccess) {
      setRegisterDetails({
        name: "",
        email: "",
        phone: "",
        password: "",
        userType: "",
        address: "",
        coords: "",
      });
      alert("registration successfull ");
    }
    // if(loggedUser){
    //   navigate()
    // }

    dispatch(reset());
  }, [loggedUser, isError, isSuccess, message]);

  const handleChange = (e) => {
    if (e.target.value === "Restaurant") {
      setIsDialogOpen(true);
    }
    setRegisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => console.log(registerDetails), [registerDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterDetails({
      ...registerDetails,
      phone: phone - 0,
    });
    dispatch(register(registerDetails));
  };

  useEffect(() => {
    if (userType === "Driver") {
      setRegisterDetails({
        ...registerDetails,
        address: "",
        coords: "",
      });
    }
  }, [userType]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <SimpleDialog
        isDialogOpen={isDialogOpen}
        closeDialog={() => {
          setIsDialogOpen(false);
          setRegisterDetails({
            ...registerDetails,
            userType: "",
            address: "",
            coords: "",
          });
          dispatch(resetBing());
        }}
        dialogTitle="Restaurant Address"
        dialogText={<AddressForm />}
        confirmFunction={() => {
          console.log("confirmfunction");
          setIsDialogOpen(false);
        }}
      />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ width: "95%"}}
        elevation="20"
      >
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            p: "2rem",
            borderRadius: "40px",
             boxShadow: 24
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  type="text"
                  value={name}
                  label="Name"
                  onChange={handleChange}
                  required={true}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  type="email"
                  label="Email Address"
                  fullWidth
                  value={email}
                  onChange={handleChange}
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={handleChange}
                  required={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "150px" }} size="small">
                  <InputLabel>I am:</InputLabel>
                  <Select
                    name={targetName}
                    value={userType}
                    label="I am"
                    onChange={handleChange}
                    required
                  >
                    {typeOfUser.map((user) => {
                      return (
                        <MenuItem key={user} value={user}>
                          {user}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "20px", boxShadow: 8 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
