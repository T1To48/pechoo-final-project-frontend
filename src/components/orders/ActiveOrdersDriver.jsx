import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { lokalStorage } from "../../features/importsIndex.jsx";
import {
  get_User_Orders_By_Status,
  resetOrderStates,
  updateOrder,
} from "../../features/orders/orderSlice.jsx";
import {
  fetchCurrentLocation,
  getRouteInfo,
  resetBing,
} from "../../features/BingMapsApi/bingSlice.jsx";

import SimpleDialog from "../Common/SimpleDialog.jsx";
import OrderCard from "./orderCard/OrderCard.jsx";

const ActiveOrdersDriver = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const { isSuccess, isLoading, isError, errorMessage, userOrders } =
    useSelector((state) => state.order);

  const [dialogDetails, setDialogDetails] = useState({
    orderId: "",
    orderStatus: "",
    dialogTitle: "",
    dialogText: "Update Order Status...",
  });

  const dialogInfo = (orderStatus, orderId) => {
    switch (orderStatus) {
      case "Ready For Delivery":
        setDialogDetails({
          ...dialogDetails,
          orderId: orderId,
          orderStatus: "On The Way",
          dialogTitle: "Order On The Way?",
        });
        setOpenDialog(true);
        return true;
      case "On The Way":
        setDialogDetails({
          ...dialogDetails,
          orderId: orderId,
          orderStatus: "Delivered",
          dialogTitle: "Arrived At the Destination?",
        });
        setOpenDialog(true);
        return true;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(`ERROR While getting active orders ${errorMessage}`);
    }
    if (isSuccess && userOrders.length > 0) {
      // setActiveOrders(lokalStorage("get","userOrders"))
      // console.log("userOrders => SUCCESS");
    }
    dispatch(resetOrderStates());
  }, [isError, isSuccess, errorMessage]);

  useEffect(() => {
    // const user = lokalStorage("get", "loggedUser") || false;

    const setDriverLocation = setInterval(() => {
      console.log("INTERVAL ACTIVE_ORDERS_DRIVER.jsx");
      dispatch(get_User_Orders_By_Status("all"));
    }, 1000);

    return () => {
      clearInterval(setDriverLocation);
    };
  }, []);
  if (userOrders.length > 0)
    return (
      <div>
        {userOrders
          .filter((order) => order.orderStatus !== "Delivered")
          .map((order) => {
        const timeLeft=((((order.createdAtMS/1)+(order.readyTime/1*60*1000))-(Date.now()/1))/1000);

            return (
              <OrderCard
                key={order.id}
                customerName={order.customerName}
                seconds={timeLeft}
                customerAddress={order.customerAddress}
                customerPhone={order.customerPhone}
                price={order.price}
                orderStatus={order.orderStatus}
                coords={order.coords}
                handleButton1={
                  order.orderStatus !== "Accepted"
                    ? () => dialogInfo(order.orderStatus, order.id)
                    : false
                }
                handleButton2={()=>{navigate(`/map`); lokalStorage("set","destination",order.coords)}}
                textButton1="Update Status"
                textButton2="Check Route"
                // routeInfo={order.routeInfo}
              />
            );
          })}

        <SimpleDialog
          isDialogOpen={openDialog}
          closeDialog={() => setOpenDialog(false)}
          dialogTitle={dialogDetails.dialogTitle}
          dialogText="Update Order Status..."
          confirmFunction={() => {
            dispatch(
              updateOrder([
                dialogDetails.orderId,
                { orderStatus: dialogDetails.orderStatus },
              ])
            );
          }}
        />
      </div>
    );

  
};

export default ActiveOrdersDriver;
