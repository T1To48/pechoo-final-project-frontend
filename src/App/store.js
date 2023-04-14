import { configureStore } from '@reduxjs/toolkit'
import {counterSlice}  from "../features/counter-test/counterSlice.js"

export const store = configureStore({
  reducer: {
    counter:counterSlice.reducer,
  },
})