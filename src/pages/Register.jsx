import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/users/userSlice.jsx";
import { resetBing } from "../features/BingMapsApi/bingSlice.jsx";
import AddressForm from "../components/AddressForm.jsx";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    userType: "",
    address: "",
    coords:"",
  });
  const { name, email, phone, password, userType, address } = registerDetails;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addressName,addressCoords } = useSelector((state) => state.bing);
  useEffect(() => {
    setRegisterDetails({
      ...registerDetails,
      coords:addressCoords,
    })
  }, [addressName,addressCoords])



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
      coords:"",
    });
      alert("registration successfull ");
    }
    // if(loggedUser){
    //   navigate()
    // }
    
    
    dispatch(reset());
  }, [loggedUser, isError, isSuccess, message]);

  const handleChange = (e) => {
    setRegisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value,
    });
  };

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

      });
    }
  }, [userType]);


  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
  
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            required={true}
          />
          <br />
          <br />
        </label>

        <label htmlFor="email">
          Email Address:
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required={true}
          />
        </label>

        <br />
        <br />

        <label htmlFor="phone">
          Phone Number:
          <input
            name="phone"
            label="Phone Number"
            type="text"
            inputMode="tel"
            value={phone}
            onChange={handleChange}
            required={true}
          />
        </label>

        <br />
        <br />

        <label htmlFor="Password">
          Password:
          <input
            name="password"
            label="password"
            type="password"
            value={password}
            onChange={handleChange}
            required={true}
          />
        </label>

        <br />
        <br />

        <label htmlFor="usertype">
          Register as:
          <select
            name="userType"
            label="hi"
            onChange={handleChange}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Choose one:
            </option>
            <option value="Restaurant">Restaurant</option>
            <option value="Driver" >
              Driver
            </option>
          </select>
        </label>

        <br />
        <br />
        <br />
        <br />
        {userType === "Restaurant" && (
        <label htmlFor="name">
          Restaurant Address:
          <AddressForm />
        </label>
      )}
      <br />
      <br />
        <button type="submit">REGISTER</button>
      
      

      </form>
    
  );
};

export default Register;
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';




// export default function Register() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="First Name"
//                   autoFocus
                  
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox value="allowExtraEmails" color="primary" />}
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright label="fgfg" sx={{ mt: 5 }} />
//       </Container>
//   );
// }