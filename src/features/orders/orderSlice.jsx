import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newOrder, userOrdersByStatus,publishedOrders, updateOrder_TOAccepted, changeOrderDetails } from "./orderService.jsx";
import { lokalStorage } from "../importsIndex.jsx";

const initialState = {
  userOrders: [],
  publishedOrder: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: "",
  published_orders_success :false,
  isOrderStatusAccepted:false,
  isUpdateOrder:false,

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
export const updateOrderAccepted=createAsyncThunk(
  "order/updateOrderAccepted",
  async(orderId,thunkAPI)=>{
    try{
      const response =await updateOrder_TOAccepted(orderId);
      if (!response.success) {
        throw new error(response.data);
      }
      return response;

    }catch(error){
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
)
//update order
export const updateOrder=createAsyncThunk(
  "order/updateOrder",
  async(toUpdateArr,thunkAPI)=>{
    try{
      const[orderId,updateObj]=toUpdateArr
      const updatedOrder= await changeOrderDetails(orderId,updateObj);
      if (updatedOrder.message) {
        throw new Error(updatedOrder.message);
      }
      if (!updatedOrder) {
        throw new Error("UpdateOrder Failed");
      }
      return updatedOrder.data
    }
    catch(error){
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error;
    return thunkAPI.rejectWithValue(message);

    }
  }
)
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
      let published_Orders=Orders.data.length>0?Orders.data:[];
      return published_Orders;


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
      state.publishedOrder = null;
      state.errorMessage = "";
      state.published_orders_success = false;
      state.isUpdateOrder=false;

    },
    resetIsOrderStatusAccepted:(state)=>{
      state.isOrderStatusAccepted=false;
    }
    
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
        state.userOrders=action.payload;
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
        state.published_orders_success = true;
        
        lokalStorage("set","publishedOrders",action.payload);

      })
      .addCase(getPublishedOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdateOrder=true;

      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateOrderAccepted.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderAccepted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOrderStatusAccepted=true;

      })
      .addCase(updateOrderAccepted.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
  },
});

export const { resetOrderStates,resetIsOrderStatusAccepted } = orderSlice.actions;

export default orderSlice.reducer;
