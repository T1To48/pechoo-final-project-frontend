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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// import { resetBing } from "../features/BingMapsApi/bingSlice.jsx";
// import { register, reset,verifyCodeByEmail,resetVerifyCode } from "../features/users/userSlice.jsx";
// import EmailVerfication from "./EmailVerfication.page.jsx";
// import AddressForm from "../components/AddressForm.jsx";
// import SimpleDialog from "../components/Common/SimpleDialog.jsx";

// import {
//   Link,
//   Button,
//   TextField,
//   Grid,
//   Box,
//   Typography,
//   Container,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select,
// } from "@mui/material";
// import { lokalStorage } from "../features/importsIndex.jsx";

// export default function RegisterMUI() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [registerDetails, setRegisterDetails] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     userType: "",
//     address: "",
//     coords: "",
//   });
//   const { name, email, phone, password, userType, address } = registerDetails;

//   const targetName = "userType";
//   const typeOfUser = ["Restaurant", "Driver"];
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { addressName, addressCoords } = useSelector((state) => state.bing);

//   useEffect(() => {
//     setRegisterDetails({
//       ...registerDetails,
//       coords: addressCoords,
//       address: addressName,
//     });
//   }, [addressName, addressCoords]);

//   const {  isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.user
//   );

//   useEffect(() => {
//     if (isError) {
//       alert(`ERROR While Registering ${message}`);
//     }
//     console.log(message)
//     if (isSuccess&& message==="register success") {
//       setRegisterDetails({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         userType: "",
//         address: "",
//         coords: "",
//       });
//       alert("registration successfull ");
//     }

//     dispatch(reset());
//   }, [ isError, isSuccess, message]);

//   const handleChange = (e) => {
//     if (e.target.value === "Restaurant") {
//       setIsDialogOpen(true);
//     }
//     setRegisterDetails({
//       ...registerDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   useEffect(() => console.log(registerDetails), [registerDetails]);

//   const handleSubmit = async (e) => {
//       e.preventDefault();

// setRegisterDetails({
//       ...registerDetails,
//       phone: phone - 0,
//     });
//     dispatch(verifyCodeByEmail(email));
//     lokalStorage("set","registerUser",registerDetails);
//     navigate("/email-verfi")
//   };

//   useEffect(() => {
//     if(lokalStorage("get","registerUser")){
//       setRegisterDetails({
//         ...registerDetails,
//         ...lokalStorage("get","registerUser")
//       })
//     }
//     if (userType === "Driver") {
//       setRegisterDetails({
//         ...registerDetails,
//         address: "",
//         coords: "",
//       });
//     }
//   }, [userType]);

//   if (isLoading) {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <>
//       <SimpleDialog
//         isDialogOpen={isDialogOpen}
//         closeDialog={() => {
//           setIsDialogOpen(false);
//           setRegisterDetails({
//             ...registerDetails,
//             userType: "",
//             address: "",
//             coords: "",
//           });
//           dispatch(resetBing());
//         }}
//         dialogTitle="Restaurant Address"
//         dialogText={<AddressForm />}
//         confirmFunction={() => {
//           console.log("confirmfunction");
//           setIsDialogOpen(false);
//         }}
//       />
//       <Container
//         component="main"
//         maxWidth="xs"
//         sx={{ width: "95%" }}
//         elevation="20"
//       >
//         <Box
//           sx={{
//             mt: 5,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             bgcolor: "white",
//             p: "2rem",
//             borderRadius: "40px",
//             boxShadow: 24,
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Register
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   name="name"
//                   type="text"
//                   value={name}
//                   label="Name"
//                   onChange={handleChange}
//                   required={true}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   name="email"
//                   type="email"
//                   label="Email Address"
//                   fullWidth
//                   value={email}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   name="phone"
//                   label="Phone Number"
//                   type="tel"
//                   inputMode="tel"
//                   value={phone}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   name="password"
//                   label="password"
//                   type="password"
//                   value={password}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl sx={{ width: "150px" }} size="small">
//                   <InputLabel>I am:</InputLabel>
//                   <Select
//                     name={targetName}
//                     value={userType}
//                     label="I am"
//                     onChange={handleChange}
//                     required
//                   >
//                     {typeOfUser.map((user) => {
//                       return (
//                         <MenuItem key={user} value={user}>
//                           {user}
//                         </MenuItem>
//                       );
//                     })}
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>

//             <Button

//               fullWidth
//               variant="contained"
//               type="submit"
//               sx={{ mt: 3, mb: 2, borderRadius: "20px", boxShadow: 8 }}
//             >
//               Procced
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link onClick={() => navigate("/login")}>
//                   Already have an account? Login
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </>
//   );
// }