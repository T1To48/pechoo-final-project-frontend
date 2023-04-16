import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/users/userSlice.jsx";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    userType: "",
    address: "",
  });
  const { name, email, phone, password, userType, address } = registerDetails;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      alert(`ERROR While Registering ${message}`);
    }
    if (loggedUser || isSuccess) {
      alert("registration successfull ");
    }
    dispatch(reset());
  }, [loggedUser, isLoading, isError, isSuccess, message]);

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
  } else {
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
            type="number"
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
            <option value="Driver">Driver</option>
          </select>
        </label>

        <br />
        <br />

        {userType === "Restaurant" && (
          <label htmlFor="name">
            Restaurant Address:
            <input
              name="address"
              label="address"
              type="text"
              value={address}
              onChange={handleChange}
              required={true}
            />
          </label>
        )}

        <button type="submit">REGISTER</button>
      </form>
    );
  }
};

export default Register;
