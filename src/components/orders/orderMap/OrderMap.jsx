import React, { useEffect, useState } from "react";
import { lokalStorage } from "../../../features/importsIndex.jsx";
import { getRouteInfo, resetBing } from "../../../features/BingMapsApi/bingSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import  Timer from "../orderCard/Timer.jsx"

const OrderMap = ({ end }) => {
  const dispatch = useDispatch();
  const [wayPoints, setWayPoints] = useState({
    start:lokalStorage("get", "currentLocation"),
    end:lokalStorage("get", "destination")
  }||{});
  const [routeDetails, setRouteDetails] = useState("");
  const windowWidth = window.innerWidth;
  let width = Math.floor(windowWidth);
  const windowHeight = window.innerHeight;
  let urlHeight = Math.floor(windowHeight * 0.9);
  // let imgHeight = Math.floor(windowHeight * 0.9);
  const mapUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Map/CanvasDark/Routes?wp.1=${wayPoints.start};38&wp.2=${wayPoints.end};113;Destination&format=png&mapSize=${width},${urlHeight}&mapMetadata=0&key=${
    import.meta.env.VITE_Bing_Api_Key
  }`;

  const { isSuccess,isError } = useSelector((state) => state.bing);

  useEffect(() => {
    if (isSuccess) {
      const routeInfo = lokalStorage("get", "routeInfo");

    setWayPoints({
      ...wayPoints,
      start:lokalStorage("get", "currentLocation"),
    });
    }
    if (isError) {
      window.location.reload()
    }
    dispatch(resetBing())


  }, [isSuccess,isError]);

  useEffect(() => {
    const driverLocation = setInterval(() => {
      // setStart(lokalStorage("get", "currentLocation"));
      dispatch(getRouteInfo(wayPoints));

    }, 4000);

    return () => {
      clearInterval(driverLocation);
    }
  }, []);

  return (
    <div>
      {routeDetails&&
    <>
     <span><h2>{routeDetails.travelDistance}</h2></span><Timer seconds={routeDetails.travelDurationLive-0}/>
      
    </>
        
      
    }
        <div
      style={{
        display: "flex",
        justifyContent: "center",
        background:`url(${mapUrl})no-repeat center center fixed`,
        height:"50%",
        width:"100%"
      }}
    >
      <img
        src={mapUrl}
        // style={{ height: imgHeight }}
        type="image/png"
        alt="Route Map"
      />
      <br/>
      <br/>
      <br/>
      
      
     
    </div>
    

    </div>
  
  );
};

export default OrderMap;
