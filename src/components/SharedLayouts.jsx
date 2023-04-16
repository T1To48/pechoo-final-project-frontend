import { Outlet } from "react-router-dom";


const SharedLayout = () => {
  return (
    <>
      <div>NAVBAR OR LOGO</div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
          <Outlet />
      
    </>
  );
};

export default SharedLayout;
