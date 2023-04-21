import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lokalStorage } from "../../features/importsIndex.jsx";
import { getPublishedOrders,resetOrderStates } from "../../features/orders/orderSlice.jsx";
import { fetchCurrentLocation,getRouteInfo,resetBing } from "../../features/BingMapsApi/bingSlice.jsx";
import { useNavigate } from "react-router-dom";

import OrderCard from "./orderCard/OrderCard.jsx"

const OrderCardsMap = () => {
  const [publishedOrders, setPublishedOrders] = useState([]);
  const [routeDetails, setRouteDetails] = useState({
    start:lokalStorage("get","currentLocation"),
    end:"",
  })
const navigate=useNavigate();
  const dispatch = useDispatch();
  const {published_orders_success,isError,errorMessage }=useSelector(state=>state.order)
  useEffect(() => {
    if(isError){
      console.log(`ERROR While getting published orders ${message}`)
    }
    if(published_orders_success){
      setPublishedOrders(lokalStorage("get","publishedOrders"))
      
      // navigate()
    }
    dispatch(resetOrderStates())
  }, [ isError, published_orders_success, errorMessage])

  
//get static map







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
routeButton={()=>navigate(`/${lokalStorage("get","currentLocation")}/${order.coords}`)}
// routeInfo={order.routeInfo}
 />)})}
    </div>
  );
};

export default OrderCardsMap;
