import React,{useEffect,useState} from "react";

const OrderMap = ({ start,end }) => {

  const windowWidth = window.innerWidth;
  let width = Math.floor(windowWidth);
  const windowHeight = window.innerHeight;
  let urlHeight = Math.floor(windowHeight * 0.7);
  let imgHeight = Math.floor(windowHeight * 0.9);

 const  mapUrl=`https://dev.virtualearth.net/REST/v1/Imagery/Map/CanvasDark/Routes?wp.1=${start};38&wp.2=${end};113;Destination&format=png&mapSize=${width},${urlHeight}&mapMetadata=0&key=${import.meta.env.VITE_Bing_Api_Key}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <img
        src={mapUrl}
        style={{ height: imgHeight }}
        type="image/png"
        alt="Route Map"
      />
    </div>
  );
};

export default OrderMap;
