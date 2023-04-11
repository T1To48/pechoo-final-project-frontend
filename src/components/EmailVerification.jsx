import React,{useState,useEffect} from 'react'
import axios from "axios";
import bcrypt from "bcryptjs";

const CheckEmail = () => {
    const [isCorrect, setIsCorrect] = useState(false);
    const [verfiCode, setverfiCode] = useState("");

const EmailVerification =async()=>{
    let headersList = {
 "Accept": "*/*",
}

let options = {
  method: "POST",
  url: "http://localhost:5000/delivery-app/v1/verify/tofek.98@gmail.com",
  headers: headersList,
}
try{
    const response = await axios.request(options);
    const {userEmail,verficationCode}=await response.data
      setverfiCode(verficationCode)
     console.log("typeof verfiCode :",typeof verficationCode)

}catch(error){
    console.log(error)
}



}

const checkCode=(e)=>{
    console.log(typeof e.target.value)
        setIsCorrect(e.target.value==verfiCode)
    
    
}
useEffect(() => {
  console.log("isCorrect",isCorrect)

}, [isCorrect])


  return (
  <> 
  
  <button onClick={EmailVerification}>send code</button>


  <input type="number" onChange={checkCode} label="recieved code"  />
  <h1>Verification Code is ,{`${isCorrect}`}  </h1>
 </>
   
  )
}

export default CheckEmail;