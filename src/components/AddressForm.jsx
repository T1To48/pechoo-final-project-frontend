import React, { useState, useEffect } from "react";
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentLocation,
  getAddressByCoords,
  getAddressByString,
  resetBing,
} from "../features/BingMapsApi/bingSlice.jsx";
import { IconButton, Typography,Grid,TextField, Button,Box, } from "@mui/material";

const AddressForm = ({withCurrentLocation}) => {
  const[disableCheckAddress,setDisableCheckAddress]=useState(true);
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
  const checkAddress = async (e) => {
    
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
    if(streetNumber&&street&&city) {

      setDisableCheckAddress(false)
     }
     if(!streetNumber||!street||!city){

      setDisableCheckAddress(true)
     }
  }, [fullAddress]);


  useEffect(() => {
    dispatch(fetchCurrentLocation());
    return async () => {
      dispatch(resetBing());
    };
  }, []);

  const changeAddress = (e) => {
    

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
   <Box variant="div"   >
             <Grid container spacing={1.5} sx={{
            mt: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            p: "0 2rem",
            
          }}>
              {withCurrentLocation&&
              <>
              <Grid item xs={12}  >
                <Button variant="contained" onClick={getCurrentAddress} > <MyLocationRoundedIcon/> &nbsp; Current Location </Button>
        
              </Grid>  <Grid sx={{fontWeight:700}}item xs={12}  >
              
              OR 
              </Grid>
              </>}
            
              <Grid item xs={12}>
                <TextField
                  label="Street Number"
        name="streetNumber"
        value={streetNumber}
        placeholder="Street Number"
        onChange={handleChange}
        required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                type="text"
                name="street"
                value={street}
                placeholder="Street"
                onChange={handleChange}
                required
                  label="Street"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="City"
                  type="text"
        name="city"
        value={city}
        placeholder="City"
        onChange={handleChange}
        required
                />
              </Grid>
               <Grid item xs={12}>
<Button variant="contained" onClick={checkAddress} disabled={disableCheckAddress}>Check Address</Button >
              </Grid>
              </Grid>

   </Box>
        
      </>
     
  );
};

export default AddressForm;
