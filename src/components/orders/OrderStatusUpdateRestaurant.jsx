import React from 'react'
import { FormControl,InputLabel,Select,MenuItem } from '@mui/material';
const OrderStatusUpdateRestaurant = ({onChange,value}) => {
    const orderStatus=[
        "Published",
        "Accepted",
        "Ready For Delivery",
        "On The Way",
        "Delivered",
      ];
const tragetName="orderStatus"
  return (
    <div style={{ display:"flex",justifyContent:"center", }}>
      <FormControl sx={{minWidth:100}} size="small">
    <Select
      name={tragetName}
       value={value}
      onChange={onChange}
      required
    >
      {orderStatus.map((status) => {
        return (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        );
      })}
    </Select>
  </FormControl></div>
    
  )
}

export default OrderStatusUpdateRestaurant