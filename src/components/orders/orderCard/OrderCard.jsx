import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { resetBing,getRouteInfo } from "../../../features/BingMapsApi/bingSlice.jsx";

import Timer from "./Timer.jsx";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import { useTheme } from "@emotion/react";
import { CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Accordion from "./Accordion.jsx";
import { AccordionDetails } from "./AccordionDetails.jsx";
import { AccordionSummary } from "./AccordionSummary.jsx";
import Chip from "@mui/material/Chip";
import AlarmOnRoundedIcon from "@mui/icons-material/AlarmOnRounded";

export default function OrderCard({
  seconds,
  customerName,
  customerAddress,
  customerPhone,
  price,
  orderStatus,
  handleButton1,
  handleButton2,
  textButton1,
  textButton2,
  routeInfo,
  // imageUrl,
  // coords
}) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <AccordionSummary
          sx={{
            backgroundColor: theme.palette.primary.black,
            borderRadius: "50px",
            height: "5rem",
          }}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography variant="h5" component="div">
            {orderStatus === "Published" && seconds > 0 && (
              <Timer seconds={seconds} />
            )}
            {orderStatus === "Ready For Delivery" && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AlarmOnRoundedIcon fontSize="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="h5">Ready For Delivery!</Typography>
              </div>
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
              {handleButton1 && (
                <Button onClick={handleButton1} size="small">
                  {textButton1}
                </Button>
              )}

              {handleButton2 && (
                <Button onClick={handleButton2} size="small">
                  {textButton2}
                </Button>
              )}
            </CardActions>
          </Card>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
