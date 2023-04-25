import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentLocation,
  getAddressByCoords,
  getAddressByString,
  resetBing,
} from "../features/BingMapsApi/bingSlice.jsx";

const AddressForm = () => {
  const [fullAddress, setFullAddress] = useState({
    streetNumber: "",
    street: "",
    city: "",
    currentCoords: "",
  });
  const { streetNumber,street,city,currentCoords } = fullAddress;
  const dispatch = useDispatch();
  const { currentLocation, addressName,addressCoords } = useSelector((state) => state.bing);

  const handleChange = (e) => {
    setFullAddress({
      ...fullAddress,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentAddress = async (e) => {
    e.preventDefault();
    if (!currentLocation) {
      dispatch(fetchCurrentLocation());
    }
    dispatch(getAddressByCoords(currentLocation));

  };
  const findAddress = async (e) => {
    // if (e.target.value === "") {
    //   return;
    // }
    if (city) {
      dispatch(getAddressByString(fullAddress));
    }
    setFullAddress({
      streetNumber: "",
      street: "",
      city: "",
      currentCoords: "",
    });
  };

  useEffect(() => {
    if (currentLocation) {
      setFullAddress({
        ...fullAddress,
        currentCoords: currentLocation?currentLocation:addressCoords,
      });
    }
  }, [currentLocation,addressCoords]);

  useEffect(() => {
    dispatch(fetchCurrentLocation());
    return async () => {
      dispatch(resetBing());
    };
  }, []);

  const changeAddress = (e) => {
    e.preventDefault();

    dispatch(resetBing());
    dispatch(fetchCurrentLocation());
  };


  if (addressName) {
    return (
      <>
        <button onClick={changeAddress}>change</button>

        <input type="text" value={addressName} disabled />
      </>
    );
  }
  return (
    <>
      <button onClick={getCurrentAddress}>use Current Location</button>
      <input
        type="text"
        name="streetNumber"
        value={streetNumber}
        placeholder="Street Number"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="street"
        value={street}
        placeholder="Street"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        value={city}
        placeholder="City"
        onChange={handleChange}
        required
      />
      <button onClick={findAddress}>Find Address</button>
    </>
  );
};

export default AddressForm;
