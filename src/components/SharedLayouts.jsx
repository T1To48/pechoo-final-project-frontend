import { Outlet } from "react-router-dom";
import BottomNavBar from "./BottomNavBar.jsx";

const SharedLayout = () => {
  return (
    <><br/>
      <br/>
    <Outlet />
      <BottomNavBar/>
      
      <br/>
      <br/>
      <br/>
          
      
    </>
  );
};

export default SharedLayout;
