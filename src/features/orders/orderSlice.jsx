import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newOrder, userOrdersByStatus } from "./orderService.jsx";

const initialState = {
  userOrders: [],
  publishedOrder: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: "",
};

//add order
export const publishOrder = createAsyncThunk(
  "order/publishOrder",
  async (orderData, thunkAPI) => {
    try {
      const orderDetails = await newOrder(orderData);
      if (orderDetails.success) {
        return orderDetails.data;
      }
      if (orderDetails.message) {
        throw new Error(orderDetails.message);
      }
      return;
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

//get order by id

//update order

//update order-status

//GET orders by status
export const get_User_Orders_By_Status = createAsyncThunk(
  "order/get_User_Orders_By_Status",
  async (status, thunkAPI) => {
    try {
      const requested_User_Orders = await userOrdersByStatus(status);
      if (requested_User_Orders.message) {
        throw new Error(requested_User_Orders.message);
      }
      if (requested_User_Orders.length < 1) {
        return "No Match Found!";
      }
      return requested_User_Orders.data;
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
//delete order

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderStates: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      //   state.userOrders=[];
      state.publishedOrder = null;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(publishOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.publishedOrder = action.payload;
        console.log("order has published successfully", action.payload);
      })
      .addCase(publishOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetOrderStates } = orderSlice.actions;

export default orderSlice.reducer;
