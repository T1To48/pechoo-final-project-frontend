import axios from "axios";
import { lokalStorage } from "../importsIndex.jsx";

const token = lokalStorage("get", "token");
const loggedUser = lokalStorage("get", "loggedUser");

const API = {
  baseUrl: "https://pechoo-server.onrender.com/delivery-app/v1/order",
  headersList: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};
const { baseUrl, headersList } = API;

//tofek.98@gmail.com eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2UwMWVkYmQ3ZjY4YzBjZTliMjUzMyIsImlhdCI6MTY4MTgxOTQ3NCwiZXhwIjoxNjg0NDExNDc0fQ.YPQcYHPIffk86tC0uf22TWTHwuF3aGmFP3HuFFMawkE

export const newOrder = async (orderData) => {
  let reqBody = JSON.stringify(orderData);
  let reqOptions = {
    url: `${baseUrl}/user-id/${loggedUser.id}`,
    method: "POST",
    headers: headersList,
    data: reqBody,
  };
  let response = await axios.request(reqOptions);
  return response.data;
};

export const userOrdersByStatus = async (status) => {
  let reqOptions = {
    url:status==="all" ?`${baseUrl}/user-id/${loggedUser.id}`:`${baseUrl}/user-id/${loggedUser.id}?orderStatus=${status}`,
    method: "GET",
    headers: { Authorization: headersList.Authorization },
  };
  let response = await axios.request(reqOptions);

  return response.data;
};

export const publishedOrders = async () => {
  let reqOptions = {
    url: `${baseUrl}/published-orders`,
    method: "GET",
    headers: { "Authorization": headersList.Authorization },
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

export const changeOrderDetails=async(orderId,toUpdate)=>{
  let reqBody=JSON.stringify(toUpdate);
  let reqOptions = {
    url:`${baseUrl}/${orderId}`,
    method:"PUT",
    headers:headersList,
    data:reqBody
  }
  let response= await axios.request(reqOptions);
  console.log(response.data);
return response.data;
}


export const  updateOrder_TOAccepted=(orderId)=>{
  
  let reqOptions = {
    url: `${baseUrl}/${loggedUser.id}/accepted/${orderId}`,
    method: "PUT",
    headers: { "Authorization": headersList.Authorization },
  };

  let response=axios.request(reqOptions);
  console.log(response)
  return response

}
