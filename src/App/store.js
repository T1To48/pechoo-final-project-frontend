import { configureStore } from '@reduxjs/toolkit'
import {userSlice} from "../features/users/userSlice.jsx"
import { bingSlice } from '../features/BingMapsApi/bingSlice.jsx'
import {orderSlice} from '../features/orders/orderSlice.jsx'

export const store = configureStore({
  reducer: {
    user:userSlice.reducer,
    bing:bingSlice.reducer,
    order:orderSlice.reducer,
  },
})