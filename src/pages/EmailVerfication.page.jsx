import React, { useState,useEffect, useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 

import { verifyCodeByEmail } from "../features/users/userSlice.jsx";

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

const EmailVerfication = ({registerEmail}) => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
  const inputRefs = useRef([]);
  const [typed_code, setTyped_code] = useState({
    digit1:0,
    digit2:0,
    digit3:0,
    digit4:0
  })

  const handleInputChange = (e, index) => {
    const inputName=e.target.name;
    const inputValue = e.target.value;
    setTyped_code({
        ...typed_code,
        [inputName]: inputValue,
    })
    if (inputValue.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    if (inputValue.length < 1 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if(inputName==="digit4"){
        dispatch(verifyCodeByEmail(registerEmail))
    }
    
  };

useEffect(() => {
    
    console.log(  Object.values(typed_code).join(""))
},[typed_code])

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
          <Grid item sx={{display:"flex",justifyContent:"space-between"}} xs={12}>
            {["digit1","digit2","digit3","digit4"].map((digit, index) => (
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
        </Grid>
        
      </Box>
    </Container>
  );
};

export default EmailVerfication;
