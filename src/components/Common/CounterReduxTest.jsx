import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {increment,decrement,incrementByAmount} from "../../features/counter-test/counterSlice.jsx"

const CounterReduxTest = () => {
  const [incAmount, setIncAmount] = useState(0)
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
     <br/> <br/>********************** <br/>
      <input type="number" value={incAmount} onChange={(e)=>setIncAmount( Number (e.target.value))} />
      <button onClick={()=>dispatch(incrementByAmount(incAmount))}>click to add</button>
    </div>
  )
}

export default CounterReduxTest