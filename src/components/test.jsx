import React,{useState,useEffect} from 'react'

const TEST = () => {
    const[toggle,setToggle]=useState(false);
    let str=toggle?"sexy pexxy":"";
  
  return (
<>

    <div>{str}</div>
    </>
  )
}

export default TEST