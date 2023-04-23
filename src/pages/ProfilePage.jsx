import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("(123) 456-7890");
  const [address, setAddress] = useState("1234 Elm Street, Springfield, IL");
  const [userRole, setUserRole] = useState("Administrator");

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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ padding: "16px", maxWidth: "400px", width: "100%" }}>
        <Grid container justifyContent="center">
          <Avatar src="/path/to/profile-picture.jpg" alt="Profile Picture" style={{ width: "100px", height: "100px" }} />
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
        <Typography align="center" color="textSecondary" gutterBottom>
          Email:{" "}
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
          Phone:{" "}
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
          Address:{" "}
          <TextField
            label="Address"
            value={address}
            onChange={handleAddressChange}
            fullWidth
            InputProps={{ style: { borderBottom: "1px solid #000" } }}
          />
        </Typography>
        <Typography align="center" color="textSecondary" gutterBottom>
          User Role:{" "}
          <TextField
            label="User Role"
            value={userRole}
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
