import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newOrder, userOrdersByStatus,publishedOrders } from "./orderService.jsx";
import { lokalStorage } from "../importsIndex.jsx";

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

export const getPublishedOrders = createAsyncThunk(
  "order/getPublishedOrders",
  async (_, thunkAPI) => {
    try {
      const Orders= await publishedOrders();

      if (Orders.data.length > 0) {
        return Orders.data;
      }
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
      })
      .addCase(get_User_Orders_By_Status.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_User_Orders_By_Status.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        lokalStorage("set","userOrders",action.payload)
      })
      .addCase(get_User_Orders_By_Status.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getPublishedOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublishedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
       lokalStorage("set","publishedOrders",action.payload)
      })
      .addCase(getPublishedOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetOrderStates } = orderSlice.actions;

export default orderSlice.reducer;
