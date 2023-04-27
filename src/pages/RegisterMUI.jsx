
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { resetBing } from "../features/BingMapsApi/bingSlice.jsx";
import {
  register,
  reset,
  verifyCodeByEmail,
  resetVerifyCode,
} from "../features/users/userSlice.jsx";
import AddressForm from "../components/AddressForm.jsx";
import SimpleDialog from "../components/Common/SimpleDialog.jsx";
import InputField from "../components/Common/InputField.jsx";
import FormWrapper from "../components/Common/FormWrapper.jsx";
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
 const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    setRegisterDetails({
      ...registerDetails,
      coords: addressCoords,
      address: addressName,
    });
  }, [addressName, addressCoords]);

 

  useEffect(() => {
    if (isError) {
      alert(`ERROR While Registering ${message}`);
    }
    if (isSuccess && message === "register success") {
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

    dispatch(reset());
  }, [isError, isSuccess, message]);

  const handleChange = (e) => {
    if (e.target.value === "Restaurant") {
      setIsDialogOpen(true);
    }
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
    dispatch(verifyCodeByEmail(email));
    lokalStorage("set", "registerUser", registerDetails);
    navigate("/email-verfi");
  };

  useEffect(() => {
    if (lokalStorage("get", "registerUser")) {
      setRegisterDetails({
        ...registerDetails,
        ...lokalStorage("get", "registerUser"),
      });
    }
    if (userType === "Driver") {
      setRegisterDetails({
        ...registerDetails,
        address: "",
        coords: "",
      });
    }
  }, [userType]);

  const registerForm = [
    {
      name: "name",
      type: "text",
      label: "Name",
      value: name,
    },
    {
      name: "email",
      type: "text",
      label: "Email Address",
      value: email,
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      value: phone,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      value: password,
    },
  ];


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
        dialogText={<AddressForm withCurrentLocation={true}/>}
        confirmFunction={() => {
          console.log("confirmfunction");
          setIsDialogOpen(false);
        }}
      />
      <FormWrapper mTop={5} title="Register">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {registerForm.map((input) => (
              <InputField
                key={input.name}
                name={input.name}
                type={input.type}
                label={input.label}
                value={input.value}
                onChange={handleChange}
              />
            ))}
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
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2, borderRadius: "20px", boxShadow: 8 }}
          >
            Procced
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => navigate("/login")}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </FormWrapper>
    </>
  );
}
