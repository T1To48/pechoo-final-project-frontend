import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from "./features/counter-TEST.js"

export const store = configureStore({
  reducer: {
    counter:counterReducer,
  },
})