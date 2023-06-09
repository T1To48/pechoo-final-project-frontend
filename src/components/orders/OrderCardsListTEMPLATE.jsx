import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lokalStorage } from "../../features/importsIndex.jsx";
import { getPublishedOrders,resetOrderStates } from "../../features/orders/orderSlice.jsx";
import { fetchCurrentLocation,getRouteInfo,resetBing } from "../../features/BingMapsApi/bingSlice.jsx";


import OrderCard from "./orderCard/OrderCard.jsx"

const OrderCardsList = () => {
  const [publishedOrders, setPublishedOrders] = useState([]);
  const [routeDetails, setRouteDetails] = useState({
    start:lokalStorage("get","currentLocation"),
    end:"",
  })

  const dispatch = useDispatch();
  const {published_orders_success,isError,errorMessage }=useSelector(state=>state.order)
  useEffect(() => {
    if(isError){
      console.log(`ERROR While getting published orders ${errorMessage}`)
    }
    if(published_orders_success){
      setPublishedOrders(lokalStorage("get","publishedOrders"))
      
    }
    dispatch(resetOrderStates())
  }, [ isError, published_orders_success, errorMessage])

  
  useEffect(() => {
    const user = lokalStorage("get", "loggedUser") || false;
  
    if (user && user.userType === "Driver") {
      const setDriverLocation = setInterval(() => {
        dispatch(getPublishedOrders());
        dispatch(fetchCurrentLocation());
      }, 7000);
  
      return () => {
        clearInterval(setDriverLocation);
      };
    }
  }, []);
  






  return (
    <div>
      {publishedOrders.map((order)=>{
        const timeLeft=((((order.createdAtMS-0)+(order.readyTime*60*1000))-(Date.now()))/1000);
        

        return( <OrderCard 
          key={order.id}
      seconds={timeLeft}
customerName= {order.customerName}
customerAddress = {order.customerAddress}
customerPhone = {order.customerPhone}
price = {order.price}
orderStatus ={order.orderStatus}
coords={order.coords}
// routeInfo={order.routeInfo}
 />)})}
    </div>
  );
};

export default OrderCardsList;
