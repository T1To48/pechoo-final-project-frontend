import React from 'react'
import OrderMap from '../components/orders/orderMap/OrderMap.jsx'
import { useParams } from 'react-router-dom'

const Map = () => {
const {
    startCoords,
    endCoords,
}=useParams()

  return (
    <div>
        <OrderMap start={startCoords} end={endCoords}/>
    </div>
  )
}

export default Map