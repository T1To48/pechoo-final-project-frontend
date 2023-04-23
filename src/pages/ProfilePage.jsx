import React, { useEffect, useState } from "react";
import {lokalStorage} from "../utils/helpers/lokalStorage.jsx"

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ProfilePage = () => {
  const [ProfileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    phone:"",
    address: "",
    userType:'',
  })
  const{name,email,phone,address,userType}=ProfileDetails

useEffect(() => {
const user =lokalStorage("get","loggedUser")
setProfileDetails({
  name:user.name,
  email:user.email,
  phone:user.phone,
  address:user.address,
  userType:user.userType
})
},[]) 
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleUserRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"  }}>
      <div style={{ padding: "16px", maxWidth: "400px", width: "100%" ,backgroundColor:"white",}}>
        <Grid container justifyContent="center">
          <Avatar src="/path/to/profile-picture.jpg" alt="Profile Picture" style={{ width: "100px", height: "100px",marginBottom:"2rem" }} />
        </Grid>
        <Typography variant="h4" align="center" gutterBottom>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            InputProps={{ style: { borderBottom: "1px solid #000" } }}
          />
        </Typography>
        <Typography align="center" variant="div" color="textSecondary" gutterBottom>
          Email:
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            InputProps={{ style: { borderBottom: "1px solid #000" } }}
          />
        </Typography>
        <Typography align="center" color="textSecondary" gutterBottom>
          Phone:
          <TextField
            label="Phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            fullWidth
            InputProps={{ style: { borderBottom: "1px solid #000" } }}
          />
        </Typography>
        <Typography align="center" color="textSecondary" gutterBottom>
          Address:
          <TextField
            label="Address"
            value={address}
            onChange={handleAddressChange}
            fullWidth
            InputProps={{ style: { borderBottom: "1px solid #000" } }}
          />
        </Typography>
        <Typography align="center" color="textSecondary" gutterBottom>
          User Role:
          <TextField
            label="User Role"
            value={userType}
            onChange={handleUserRoleChange}
            fullWidth
            InputProps={{ style: { borderBottom: "1px solid #000" } }}
          />
        </Typography>
      </div>
    </div>
  );
};

export default ProfilePage;
