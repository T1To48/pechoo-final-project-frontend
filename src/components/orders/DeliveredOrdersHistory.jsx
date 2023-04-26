import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  get_User_Orders_By_Status,
  resetOrderStates,
} from "../../features/orders/orderSlice.jsx";

import OrderCard from "./orderCard/OrderCard.jsx";

const DeliveredOrdersHistory = () => {
  const dispatch = useDispatch();

  const { isSuccess, isLoading, isError, errorMessage, userOrders } =
    useSelector((state) => state.order);

  useEffect(() => {
    if (isError) {
      console.log(`ERROR While getting active orders ${errorMessage}`);
    }
    if (isSuccess && userOrders.length > 0) {
      console.log("Delivere Orders => SUCCESS");
    }
    dispatch(resetOrderStates());
  }, [isError, isSuccess, errorMessage]);

  useEffect(() => {
    dispatch(get_User_Orders_By_Status("Delivered"));
  }, []);
  if (userOrders.length > 0)
    return (
      <div>
        {userOrders.map((order) => {
          return (
            <OrderCard
              key={order.id}
              customerName={order.customerName}
              customerAddress={order.customerAddress}
              customerPhone={order.customerPhone}
              price={order.price}
              orderStatus={order.orderStatus}
              // coords={order.coords}
              // handleButton1={
              //   order.orderStatus !== "Accepted"
              //     ? () => dialogInfo(order.orderStatus, order.id)
              //     : false
              // }
              // handleButton2={()=>{navigate(`/map`); lokalStorage("set","destination",order.coords)}}
              // textButton1="Update Status"
              // textButton2="Check Route"
            />
          );
        })}
      </div>
    );
};

export default DeliveredOrdersHistory;
