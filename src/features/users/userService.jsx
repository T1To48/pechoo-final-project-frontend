import axios from "axios";
import {lokalStorage} from "../importsIndex.jsx"

const API={
    url:"https://pechoo-server.onrender.com/delivery-app/v1/user",
    headers:{"Content-Type": "application/json"},
    token:()=>{return  lokalStorage("get","userToken")},
    authHeaders:{"Content-Type": "application/json",authorization:`bearer ${lokalStorage("get","userToken")}`}
}
    const{url,headers,authHeaders}=API

//register
export const registerUser=async(userData)=>{       
       let reqBody = JSON.stringify(userData);
       let reqOptions = {
         url: url,
         method: "POST",
         headers: headers,
         data: reqBody,
       }
       
       let response = await axios.request(reqOptions);
       console.log(response)
       return response.data;
    }
//login
// export const login=async(userData)=>{
//     let reqBody=JSON.stringify(userData);
//     let reqOptions={
//         url:url,
//         method:"GET",
//         headers:headers,
//         data:reqBody
//     }
//     let response=await axios.request(reqOptions);
//     const{}
//     return 
// }
//update User
//delete User
