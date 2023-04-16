import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "./userService.jsx";
import { 
    lokalStorage,
     } from "../importsIndex.jsx";

const loggedUser = lokalStorage("get", "loggedUser");

const initialState = {
  loggedUser: loggedUser ? loggedUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return registerUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        reset:(state)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=false
        state.message=""

    }},
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false;
           
            if(action.payload.message){
                state.message=action.payload.message
                state.isError=true;
                return;
            }
            state.isSuccess=true;
            // state.loggedUser=action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
        })
    }

})

export const {reset}=userSlice.actions
export default userSlice.reducer