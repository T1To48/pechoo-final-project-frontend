import React, { useEffect, useState } from "react";
import { lokalStorage } from "../../../features/importsIndex.jsx";
import { getRouteInfo, resetBing } from "../../../features/BingMapsApi/bingSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import  Timer from "../orderCard/Timer.jsx"

const OrderMap = ({ end }) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(lokalStorage("get", "currentLocation")||"");
  const [routeDetails, setRouteDetails] = useState("");
  const windowWidth = window.innerWidth;
  let width = Math.floor(windowWidth);
  const windowHeight = window.innerHeight;
  let urlHeight = Math.floor(windowHeight * 0.7);
  let imgHeight = Math.floor(windowHeight * 0.9);
  const mapUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Map/CanvasDark/Routes?wp.1=${start};38&wp.2=${end};113;Destination&format=png&mapSize=${width},${urlHeight}&mapMetadata=0&key=${
    import.meta.env.VITE_Bing_Api_Key
  }`;

  const { isSuccess } = useSelector((state) => state.bing);

  useEffect(() => {
    if (isSuccess) {
      const routeInfo = lokalStorage("get", "routeInfo");

    setRouteDetails(routeInfo);
    }
    dispatch(resetBing())


  }, [isSuccess]);

  useEffect(() => {
    const driverLocation = setInterval(() => {
      setStart(lokalStorage("get", "currentLocation"));
      dispatch(getRouteInfo({ start: start, end: end }));

    }, 5000);

    return () => {
      clearInterval(driverLocation);
    }
  }, []);

  return (
    <div>
        <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={mapUrl}
        style={{ height: imgHeight }}
        type="image/png"
        alt="Route Map"
      />
      <br/>
      <br/>
      <br/>
      
      
     
    </div>
    {routeDetails&&<>
         <Timer seconds={routeDetails.travelDurationLive-0}/>
      <h2>{routeDetails.travelDistance}</h2>
      </>
    }

    </div>
  
  );
};

export default OrderMap;
