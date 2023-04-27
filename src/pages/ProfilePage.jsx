import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/users/userSlice.jsx";
import {lokalStorage} from "../utils/helpers/lokalStorage.jsx"

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
const ProfilePage = () => {
const dispatch=useDispatch();
const navigate=useNavigate();

  const user =lokalStorage("get","loggedUser")

  const [ProfileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    phone:"",
    address: "",
    userType:'',
  })
  const{name,email,phone,address,userType}=ProfileDetails
const avatarChars=()=>{
  if(name){
     const splitName=name.split(" ");
  return `${splitName[0][0]}${splitName[1][0]}`.toUpperCase()
  }
 
}
useEffect(() => {
setProfileDetails({
  name:user.name,
  email:user.email,
  phone:user.phone,
  address:user.address||null,
  userType:user.userType
})
},[]) 
  const handleChange = (e) => {
    setProfileDetails({
      ...ProfileDetails,
      [e.target.name]:e.target.value
    });
  };

const handleLogout=()=>{
  dispatch(logout())
  navigate("/login")
  
}

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"  }}>
      <div style={{ padding: "16px", maxWidth: "400px", width: "100%" ,backgroundColor:"white",borderRadius:"40px",margin:"2rem"}}>
        <Grid container justifyContent="center">
          <Avatar  children={avatarChars()} sx={{backgroundColor:"#B2DB5B", width: "100px", height: "100px",marginBottom:"2rem",fontSize:"2.3rem",fontWeight:"600" }} />
        </Grid>
        <Typography variant="div" align="center" gutterBottom>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fullWidth
           sx={{ borderBottom: "1px solid #000" } }
          />
        </Typography>
        <br/><br/>
        <Typography align="center" variant="div"  color="textSecondary" gutterBottom>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            fullWidth
             sx={{ borderBottom: "1px solid #000" } }
          />
        </Typography>
        <br/><br/>
        <Typography align="center"  variant="div"color="textSecondary" gutterBottom>
          <TextField
            label="Phone"
            name="phone"
            type="text"
            value={`0${phone}`}
            onChange={handleChange}
            fullWidth
             sx={{ borderBottom: "1px solid #000" } }
          />
        </Typography><br/><br/>
        {user.userType==="Restaurant"&&(<><Typography align="center"  variant="div" color="textSecondary" gutterBottom>
          <TextField
            label="Address"
            name="address"
            value={address}
            onChange={handleChange}
            fullWidth
             sx={{ borderBottom: "1px solid #000" } }
          />
        </Typography><br/><br/></>)}
        
        <Typography align="center" variant="div" color="textSecondary" gutterBottom>
          <TextField
            label="User Role"
            name="userType"
            value={userType}
            onChange={handleChange}
            fullWidth
             sx={{ borderBottom: "1px solid #000" } }
          />
        </Typography>
        <br/><br/>
        <Typography align="center" color="textSecondary" gutterBottom>

        <Button variant="contained" onClick={handleLogout}> Logout</Button>
        </Typography>

      </div>
    </div>
  );
};

export default ProfilePage;
