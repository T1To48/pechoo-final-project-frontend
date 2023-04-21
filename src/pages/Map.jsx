import React from 'react'
import OrderMap from '../components/orders/orderMap/OrderMap.jsx'
import { useParams } from 'react-router-dom'

const Map = () => {
const {
    endCoords,
}=useParams()



  return (
    <div>
        <OrderMap  end={endCoords}/>
    </div>
  )
}

export default Map