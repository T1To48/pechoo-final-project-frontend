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
    console.log(registerDetails)
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
