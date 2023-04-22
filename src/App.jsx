import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SharedLayout from "./components/SharedLayouts.jsx";
import {
  Register,
  Login,
  PublishOrder,
  PublishedOrders,
  Map,
  LandingPage
} from "./pages/exportsIndex.js";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentLocation,
  resetBing,
} from "./features/BingMapsApi/bingSlice.jsx";
import { lokalStorage } from "./features/importsIndex.jsx";
import { getPublishedOrders } from "./features/orders/orderSlice.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = lokalStorage("get", "loggedUser") || false;

    if (user && user.userType === "Driver") {
      const setDriverLocation = setInterval(() => {
        dispatch(fetchCurrentLocation());
      }, 10000);

      return () => {
        clearInterval(setDriverLocation);
      };
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route index element={<CounterReduxTest/>} /> */}
          <Route index element={<LandingPage/>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="published-orders" element={<PublishedOrders />} />
          <Route path=":endCoords" element={<Map />} />
          <Route path="new-order" element={<PublishOrder />} />
          {/* <Route path="orders-list" element={<OrderCardsList />} /> */}
          {/* <Route path="landing" element={<Landing />} />
            
             */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
