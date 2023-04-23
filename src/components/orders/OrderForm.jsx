import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publishOrder, resetOrderStates } from "../../features/orders/orderSlice.jsx";
import AddressForm from "../AddressForm.jsx";

const OrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    coords: "",
    price: "",
    readyTime: "",
    createdAtMS: `${Date.now()}`,
  });
  const { customerName, customerPhone, price, readyTime } = orderDetails;

  const dispatch = useDispatch();
  const { addressName, addressCoords } = useSelector((state) => state.bing);
  const { isLoading, isError, isSuccess, errorMessage, publishedOrder } =
    useSelector((state) => state.order);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
    }
    if (isSuccess && publishedOrder) {
      console.log("order published successfully");
      // Navigate() 
      dispatch(resetOrderStates());
      setOrderDetails({
        customerName: "",
        customerPhone: "",
        customerAddress: "",
        coords: "",
        price: "",
        readyTime: "",
        createdAtMS: `${Date.now()}`,
      });
    }

   
  }, [isLoading, isError, isSuccess, errorMessage]);

  useEffect(() => {
    setOrderDetails({
      ...orderDetails,
      customerAddress: addressName && addressName,
      coords: addressCoords && addressCoords,
    });
  }, [addressName, addressCoords]);

  const handleChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    // setOrderDetails({
    //     ...orderDetails,
    //     readyTime:readyTime,
    // })
    dispatch(publishOrder(orderDetails));
  };

  useEffect(() => {
    console.log(orderDetails);
  }, [orderDetails]);

  return (
    <form onSubmit={submitOrder}>
      <label htmlFor="customerName">
        Customer Name:
        <input
          name="customerName"
          type="text"
          value={customerName}
          onChange={handleChange}
          required
        />
        <br />
        <br />
      </label>
      <label htmlFor="customerPhone">
        Customer Phone-Number:
        <input
          name="customerPhone"
          type="text"
          inputMode="tel"
          value={customerPhone}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="price">
        Price:
        <input
          name="price"
          type="number"
          inputMode="decimal"
          value={price}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="readyTime">
        Preparing Time:
        <input
          name="readyTime"
          type="number"
          inputMode="decimal"
          value={readyTime}
          onChange={handleChange}
          required
        />
      </label>

      <br />
      <br />
      <AddressForm />
      <br />
      <br />
      <button type="submit">Publish Order</button>
    </form>
  );
};

export default OrderForm;
