import { Outlet } from "react-router-dom";
import BottomNavBar from "./BottomNavBar.jsx";
const SharedLayout = () => {
  return (
    <>
    <Outlet />
    <BottomNavBar />
      
      
      <br/>
      <br/>
      <br/>
          
      
    </>
  );
};

export default SharedLayout;