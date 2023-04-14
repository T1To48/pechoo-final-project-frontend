import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {increment,decrement} from "../features/counter-test/counterSlice.js"

const CounterReduxTest = () => {
    const count=useSelector((state)=>state.counter.value)
    const dispatch=useDispatch();

  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  )
}

export default CounterReduxTest