import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lokalStorage } from "../../features/importsIndex.jsx";
import { getPublishedOrders,resetOrderStates } from "../../features/orders/orderSlice.jsx";
import { fetchCurrentLocation,resetBing } from "../../features/BingMapsApi/bingSlice.jsx";


import OrderCard from "./orderCard/OrderCard.jsx"

const OrderCardsList = () => {
  const [publishedOrders, setPublishedOrders] = useState(
    () => lokalStorage("get", "publishedOrders") || []
  );

//get static map

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, errorMessage } = useSelector(
    (state) => state.order
  );
  
  useEffect(() => {
      if (isError) {
        console.log(`ERROR While Login ${errorMessage}`);
      }
      if (isSuccess) {
        setPublishedOrders(lokalStorage("get", "publishedOrders"));
        console.log(`successfully fetched published orders`);
      }
      
      dispatch(resetOrderStates());
    }, [, isError, isSuccess, errorMessage]);


  useEffect(() => {
    const updatePublishedList = setInterval(async () => {
      dispatch(getPublishedOrders());
    }, 1);
    dispatch(fetchCurrentLocation())
    dispatch(resetOrderStates())
    dispatch(resetBing())
    return () => {
      clearInterval(updatePublishedList);
    };
  }, []);

  useEffect(() => {

  },[])

  return (
    <div>
      {publishedOrders.map((order)=>{
        const timeLeft=order.createdAtMS+(order.readyTime*600*100)-(Date.now());
        return( <OrderCard 
          key={order.id}
      seconds={order.timeLeft}
customerName= {order.customerName}
customerAddress = {order.customerAddress}
customerPhone = {order.customerPhone}
price = {order.price}
orderStatus ={order.orderStatus}
coords={order.coords}
 />)})}
    </div>
  );
};

export default OrderCardsList;
