import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lokalStorage } from "../../features/importsIndex.jsx";
import { getPublishedOrders,resetIsOrderStatusAccepted,resetOrderStates, updateOrderAccepted } from "../../features/orders/orderSlice.jsx";
import { fetchCurrentLocation,getRouteInfo,resetBing } from "../../features/BingMapsApi/bingSlice.jsx";
import { useNavigate } from "react-router-dom";

import OrderCard from "./orderCard/OrderCard.jsx"

const PublishedOrdersList = () => {
  const [publishedOrders, setPublishedOrders] = useState([]);
  const [routeDetails, setRouteDetails] = useState({
    start:lokalStorage("get","currentLocation"),
    end:"",
  })
const navigate=useNavigate();
  const dispatch = useDispatch();
  const {published_orders_success,isError,errorMessage,isOrderStatusAccepted }=useSelector(state=>state.order)
  useEffect(() => {
    if(isError){
      console.log(`ERROR While getting published orders ${errorMessage}`)
    }
    if(published_orders_success){
      setPublishedOrders(lokalStorage("get","publishedOrders"))
      
    }
    dispatch(resetOrderStates())
  }, [ isError, published_orders_success, errorMessage])

  
  const handleDriverAccept=(orderId)=>{
    console.log("TARGEET",orderId)

    dispatch(updateOrderAccepted(orderId))
}
  

useEffect(()=>{
  if(isOrderStatusAccepted){
    // navigate("/MY ACTIVE ORERS")
    console.log("DRIVER ACCEPTED THE ORDER SUCESSFULLY")
  }
  dispatch(resetIsOrderStatusAccepted())
  dispatch(resetOrderStates())
},[isOrderStatusAccepted])

useEffect(() => {
  const user = lokalStorage("get", "loggedUser") || false;

  if (user && user.userType === "Driver") {
    const setDriverLocation = setInterval(() => {
      dispatch(getPublishedOrders());
      dispatch(fetchCurrentLocation());
      console.log("i think am working!!!!!!");
    }, 7000);

    return () => {
      clearInterval(setDriverLocation);
    };
  }
}, []);


if(isError|| !publishedOrders||publishedOrders.length===0)return <h1>No published orders yet, please be patient</h1>

  return (
    <div>
      {publishedOrders.map((order)=>{
        const timeLeft=((((order.createdAtMS/1)+(order.readyTime*60*1000))-(Date.now()))/1000);
        

        return( <OrderCard 
          key={order.id}
      seconds={timeLeft}
customerName= {order.customerName}
customerAddress = {order.customerAddress}
customerPhone = {order.customerPhone}
price = {order.price}
orderStatus ={order.orderStatus}
coords={order.coords}
handleButton2={()=>{navigate(`/map`); lokalStorage("set","destination",order.coords)}}
handleButton1={()=>handleDriverAccept(order.id)}
textButton1="Accept"
textButton2="Check Route"
// routeInfo={order.routeInfo}
 />)})}
    </div>
  );
};

export default PublishedOrdersList;
