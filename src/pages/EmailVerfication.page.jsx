import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {  register,reset } from "../features/users/userSlice.jsx";

import {
  Link,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { lokalStorage } from "../features/importsIndex.jsx";

const EmailVerfication = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [typed_code, setTyped_code] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const [disable_register_button, setDisable_register_button] = useState(true);
  const {  verifyCode,isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const checkVerifyCode = () =>
    Object.values(typed_code).join("") === verifyCode;


  const handleInputChange = (e, index) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setTyped_code({
      ...typed_code,
      [inputName]: inputValue,
    });
    if (inputValue.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    if (inputValue.length < 1 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    console.log( [verifyCode,Object.values(typed_code).join("")])
    
  };

useEffect (() => {
  if (Object.values(typed_code).join("") === verifyCode) {
    setDisable_register_button(false);
  }
},[typed_code])  

  useEffect(() => {
    if (isError) {
      alert(`ERROR While Registering ${message}`);
    }
    if (isSuccess) {
      lokalStorage("remove","registerUser");
      navigate("/login")
      alert("registration successfull ");
    }

    dispatch(reset());
  }, [ isError, isSuccess, message]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ width: "95%" }}
      elevation="20"
    >
      <Box
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
          p: "2rem",
          borderRadius: "40px",
          boxShadow: 24,
        }}
      >
        <Typography component="h1" variant="h5">
          Verify Your Email
        </Typography>
        <Grid container sx={{ mt: 0.5 }} spacing={2}>
          <Grid
            item
            sx={{ display: "flex", justifyContent: "space-between" }}
            xs={12}
          >
            {["digit1", "digit2", "digit3", "digit4"].map((digit, index) => (
              <TextField
                key={index}
                inputRef={(ref) => (inputRefs.current[index] = ref)}
                type="tel"
                variant="outlined"
                inputProps={{ maxLength: 1 }}
                sx={{ width: "4rem", textAlign: "center" }}
                value={typed_code[digit]}
                name={digit}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={()=>dispatch(register(lokalStorage("get","registerUser")))}
              sx={{ mt: 3, mb: 2, borderRadius: "20px", boxShadow: 8 }}
              disabled={disable_register_button}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EmailVerfication;
