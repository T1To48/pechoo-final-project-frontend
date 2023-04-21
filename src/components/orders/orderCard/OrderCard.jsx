import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { resetBing,getRouteInfo } from "../../../features/BingMapsApi/bingSlice.jsx";

import Timer from "./Timer.jsx";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Accordion from "./Accordion.jsx";
import { AccordionDetails } from "./AccordionDetails.jsx";
import { AccordionSummary } from "./AccordionSummary.jsx";
import Chip from '@mui/material/Chip';
import { lokalStorage } from "../../../features/importsIndex.jsx";


export default function OrderCard({
  seconds,
  // imageUrl,
  customerName,
  customerAddress,
  customerPhone,
  price,
  orderStatus,
  routeButton,
  routeInfo
  // coords
}) {
  
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



  return (
    <div>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant="h5" component="div">


            {orderStatus === "Published" && seconds > 0 && (
              <Timer seconds={seconds} />
            )}

{/* { routeInfo&& ( 
              <>
              <Timer seconds={seconds} />
              {routeInfo.travelDistance}
              </>
              
            )} */}




            {/* {orderStatus === "On The Way" && routeInfo&& `${routeInfo.travelDistance},${routeInfo.travelDurationLive}`} */}
            
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ maxWidth: 345 }}>
            {/* <CardMedia
              component="img"
              alt="small route map"
              height="140"
              image={imageUrl}
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Chip label={customerName} style={{ backgroundColor: "red" }} />
                <Chip
                  label={customerAddress}
                  style={{ backgroundColor: "red" }}
                />
                <Chip
                  label={customerPhone}
                  style={{ backgroundColor: "red" }}
                />
                <Chip label={price} style={{ backgroundColor: "red" }} />
                <Chip label={orderStatus} style={{ backgroundColor: "red" }} />
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Accept</Button>
              <Button size="small" onClick={routeButton}>Check Route</Button>
            </CardActions>
          </Card>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
