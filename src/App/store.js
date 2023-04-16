import { configureStore } from '@reduxjs/toolkit'
import {counterSlice}  from "../features/counter-test/counterSlice.jsx"
import {userSlice} from "../features/users/userSlice.jsx"

export const store = configureStore({
  reducer: {
    counter:counterSlice.reducer,
    user:userSlice.reducer,
  },
})