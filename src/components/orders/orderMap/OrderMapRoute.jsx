import React from 'react'
import axios from 'axios'
import { generateUrl } from '../../../features/BingMapsApi/bingService.jsx'

const OrderMapRoute = () => {



useEffect(() => {
    const driverLocation = setInterval(() => {
      setStart(lokalStorage("get", "currentLocation"));
    }, 5000);
  }, []);

  return (
    <div>OrderMapRoute</div>
  )
}

export default OrderMapRoute