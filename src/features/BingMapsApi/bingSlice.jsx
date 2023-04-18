import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { generateUrl } from "./bingService.jsx";

const initialState = {
  currentLocation: "",
  addressName: "",
  addressCoords: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: "",
};

export const getAddressByString = createAsyncThunk("bing/getAddressByString",
async(addressObj, thunkAPI)=>{
    try{
         const response = await axios.get(generateUrl("addrByString",addressObj));
         const{data}=response
         if (data.statusDescription !== "OK") {
    throw new Error(data.errorDetails[0]);
  }
  const { estimatedTotal } = data.resourceSets[0];
  if (estimatedTotal === 0) {
    throw new Error("Address Not Found, Try Again");
  }

  const { point, name } = data.resourceSets[0].resources[0];
  const { coordinates } = point;

  const fullAddress = {
    address: name,
    coords: coordinates.join(),
  };
  return fullAddress;
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
}
)


export const getAddressByCoords = createAsyncThunk(
  "bing/getAddressByCoords",
  async (coords, thunkAPI) => {
    try {
      const response = await axios.get(generateUrl("addrByCoords", coords));
      const{data}=response
      console.log(data)
      if (data.statusDescription !== "OK") {
        throw new Error(data.errorDetails[0]);
      }
      const { estimatedTotal } = data.resourceSets[0];
      if (estimatedTotal === 0) {
        throw new Error("Address Not Found, Try Again");
      }

      const { point, name } = data.resourceSets[0].resources[0];
      const { coordinates } = point;

      const fullAddress = {
        address: name,
        coords: coordinates.join(),
      };
      return fullAddress;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const fetchCurrentLocation = createAsyncThunk(
  "bing/fetchCurrentLocation",
  async (_, thunkAPI) => {
    try {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

      const { latitude, longitude } = position.coords;
      return `${latitude},${longitude}`;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRouteInfo = createAsyncThunk(
  "bing/getRouteInfo",
  async (detinationCoords, thunkAPI) => {
    try {
      const response = await axios.get(generateUrl("addrByCoords", detinationCoords));
      const{data}=response
      console.log(data)
      if (data.statusDescription !== "OK") {
        throw new Error(data.errorDetails[0]);
      }
      const { estimatedTotal } = data.resourceSets[0];
      if (estimatedTotal === 0) {
        throw new Error("Address Not Found, Try Again");
      }

      const { point, name } = data.resourceSets[0].resources[0];
      const { coordinates } = point;

      const fullAddress = {
        address: name,
        coords: coordinates.join(),
      };
      return fullAddress;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const bingSlice = createSlice({
  name: "bing",
  initialState,
  reducers: {
    resetBing: (state) => {
      state.currentLocation = "";
      state.addressName = "";
      state.addressCoords='';
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAddressByString.pending, (state) => {
        state.isLoading=true
    })
    .addCase(getAddressByString.fulfilled,(state,action)=>{
        const{address,coords}=action.payload
        state.isLoading = false
        state.isSuccess = true
        state.addressName =address
        state.addressCoords =coords
    })
    .addCase(getAddressByString.rejected,(state,action)=>{
        state.isLoading = false
        state.isError = true
        state.errorMessage=action.payload;
    })
    .addCase(getAddressByCoords.pending, (state) => {
        state.isLoading=true
    })
    .addCase(getAddressByCoords.fulfilled,(state,action)=>{
        const{address,coords}=action.payload
        state.isLoading = false
        state.isSuccess = true
        state.addressName =address
        state.addressCoords =coords
    })
    .addCase(getAddressByCoords.rejected,(state,action)=>{
        state.isLoading = false
        state.isError = true
        state.errorMessage=action.payload;
    })
    .addCase(fetchCurrentLocation.pending, (state) => {
        state.isLoading=true
    })
    .addCase(fetchCurrentLocation.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.currentLocation=action.payload
    })
    .addCase(fetchCurrentLocation.rejected,(state,action)=>{
        state.isLoading = false
        state.isError = true
        state.errorMessage=action.payload;
    })

  },
});


export const {resetBing}=bingSlice.actions;
export default bingSlice.reducer;