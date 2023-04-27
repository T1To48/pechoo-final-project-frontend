import axios from "axios";
import { lokalStorage } from "../importsIndex.jsx";

const API = {
  url: "https://pechoo-server.onrender.com/delivery-app/v1/user",
  headers: { "Content-Type": "application/json" },
  token: () => {
    return lokalStorage("get", "userToken");
  },
  authHeaders: {
    "Content-Type": "application/json",
    authorization: `bearer ${lokalStorage("get", "userToken")}`,
  },
};
const { url, headers, authHeaders } = API;

export const sendVerifyCode = async (userEmail) => {
  let reqOptions = {
    url: `https://pechoo-server.onrender.com/delivery-app/v1/verify/${userEmail}`,
    method: "POST",
  };
  let response = await axios.request(reqOptions);
  return response.data;
};
//register
export const registerUser = async (userData) => {
  let reqBody = JSON.stringify(userData);
  let reqOptions = {
    url: url,
    method: "POST",
    headers: headers,
    data: reqBody,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};
//login

export const loginUser = async (userData) => {
  //   const{email,password}=userData

  let reqOptions = {
    url: url + "/login",
    method: "post",
    headers: headers,
    data: userData,
  };
  let response = await axios.request(reqOptions);
  return response.data;
};

//update User
//delete User
