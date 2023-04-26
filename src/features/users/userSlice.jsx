import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, sendVerifyCode } from "./userService.jsx";
import { lokalStorage } from "../importsIndex.jsx";

const loggedUser = lokalStorage("get", "loggedUser");

const initialState = {
  loggedUser: loggedUser ? loggedUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isLoggedIn: loggedUser ? true : false,
  verifyCode:"",
};

export const verifyCodeByEmail = createAsyncThunk(
  "user/verifyCodeByEmail",
  async (userEmail, thunkAPI) => {
    try {
      const data = await sendVerifyCode(userEmail);
      const CODE = data.verficationCode;
      return CODE;
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

export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const data = await registerUser(userData);
      if (data.message) {
        throw new Error(data.message);
      }
      return data;
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

export const login = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const user = await loginUser(userData);
      if (user.message) {
        throw new Error(user.message);
      }
      return user.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetVerifyCode:(state)=>{
      state.verifyCode=""
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.loggedUser = null;
      lokalStorage("clear");
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(verifyCodeByEmail.pending, (state) => {
        state.isLoading = true;
       })
      .addCase(verifyCodeByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("CODE fullfilled",action.payload)
        state.verifyCode = `${action.payload}`;
      })
       .addCase(verifyCodeByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        
       })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message="register success"
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;

        let { token, user } = action.payload;
        const userOrders = user.orders;
        lokalStorage("set", "userOrders", userOrders);
        user = {
          ...user,
          orders: [],
        };

        lokalStorage("set", "loggedUser", user);
        state.loggedUser = user;
        lokalStorage("set", "token", token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset,resetVerifyCode, logout } = userSlice.actions;
export default userSlice.reducer;
