import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { lokalStorage } from "../../features/importsIndex.jsx";
import {
  get_User_Orders_By_Status,
  resetOrderStates,
  updateOrder,
} from "../../features/orders/orderSlice.jsx";

import SimpleDialog from "../Common/SimpleDialog.jsx";
import OrderCard from "./orderCard/OrderCard.jsx";
import OrderStatusUpdateRestaurant from "./OrderStatusUpdateRestaurant.jsx";

const ActiveOrdersRestaurant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const { isSuccess, isLoading, isError, errorMessage, userOrders } =
    useSelector((state) => state.order);

  const [dialogDetails, setDialogDetails] = useState({
    orderId: "",
    orderStatus: "",
    dialogTitle: "Update Order Status",
    // dialogText: <OrderStatusUpdateRestaurant value={ this.orderStatus} onChange={onChangeOrderStatus} />,
  });
function onChangeOrderStatus(e){
  console.log(e.target.value)
  setDialogDetails({
    ...dialogDetails,
    [e.target.name]:e.target.value,
  })
}
  const openStatusUpdateDialog=(orderId)=>{
    setDialogDetails({
          ...dialogDetails,
          orderId: orderId,
        });
        setOpenDialog(true);
  }
  // const dialogInfo = (orderStatus, orderId) => {
  //   switch (orderStatus) {
  //     case "Ready For Delivery":
  //       setDialogDetails({
  //         ...dialogDetails,
  //         orderId: orderId,
  //         orderStatus: "On The Way",
  //         dialogTitle: "Order On The Way?",
  //       });
  //       setOpenDialog(true);
  //       return true;
  //     case "On The Way":
  //       setDialogDetails({
  //         ...dialogDetails,
  //         orderId: orderId,
  //         orderStatus: "Delivered",
  //         dialogTitle: "Arrived At the Destination?",
  //       });
  //       setOpenDialog(true);
  //       return true;
  //     default:
  //       return false;
  //   }
  // };

  useEffect(() => {
    if (isError) {
      console.log(`ERROR While getting active orders ${errorMessage}`);
    }
    if (isSuccess && userOrders.length > 0) {
      // setActiveOrders(lokalStorage("get","userOrders"))
    }
    dispatch(resetOrderStates());
  }, [isError, isSuccess, errorMessage]);

  useEffect(() => {
    // const user = lokalStorage("get", "loggedUser") || false;

    const setDriverLocation = setInterval(() => {
      console.log("INTERVAL ACTIVE_ORDERS_REST.jsx");
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
            return (
              <OrderCard
                key={order.id}
                customerName={order.customerName}
                customerAddress={order.customerAddress}
                customerPhone={order.customerPhone}
                price={order.price}
                orderStatus={order.orderStatus}
                coords={order.coords}
                handleButton1={()=>openStatusUpdateDialog(order.id)}
                handleButton2={() => {
                  navigate(`/map`);
                  lokalStorage("set", "destination", order.coords);
                }}
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
          dialogText={<OrderStatusUpdateRestaurant value={ dialogDetails.orderStatus} onChange={onChangeOrderStatus} />}
          confirmFunction={() => {
            setOpenDialog(false)
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

export default ActiveOrdersRestaurant;
