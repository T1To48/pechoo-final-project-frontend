import { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SharedLayout from "./components/SharedLayouts.jsx";
import {
  // Register,
  RegisterMUI,
  Login,
  PublishOrder,
  PublishedOrders,
  Map,
  LandingPage,
  ActiveUserOrders,
  OrdersHistory,
  ProfilePage

} from "./pages/exportsIndex.js";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentLocation,
  resetBing,
} from "./features/BingMapsApi/bingSlice.jsx";
import { lokalStorage } from "./features/importsIndex.jsx";
import { getPublishedOrders } from "./features/orders/orderSlice.jsx";
import EmailVerfication from "./pages/EmailVerfication.page.jsx";
function App() {
  const dispatch = useDispatch();
const [userLocation, setUserLocation] = useState("")
  useEffect(() => {
    const user = lokalStorage("get", "loggedUser") || false;

    if (user && user.userType === "Driver") {
      const setDriverLocation = setInterval(() => {
        dispatch(fetchCurrentLocation());
        console.log("APP APP.jsx")
        setUserLocation(lokalStorage("get", "currentLocation")||"")
      }, 5000);
      
      return () => {
        clearInterval(setDriverLocation);
      };
    }
  }, [userLocation]);
useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled beyond the top of the page
      if (window.scrollY < -50) {
        // Refresh the page
        window.location.reload();
      } 
    };

    // Add event listener for scroll event
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route index element={<CounterReduxTest/>} /> */}
          <Route index element={<LandingPage/>} />
          <Route path="register" element={<RegisterMUI />} />
          {/* <Route path="register" element={<Register />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="profile-page" element={<ProfilePage />} />
          <Route path="active-user-orders" element={<ActiveUserOrders />} />
          <Route path="published-orders" element={<PublishedOrders />} />
          <Route path="delivered-orders" element={<OrdersHistory />} />
          <Route path="map" element={<Map />} />
          <Route path="email-verfi" element={<EmailVerfication />} />

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
