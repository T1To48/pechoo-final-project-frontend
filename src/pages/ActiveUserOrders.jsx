import React from 'react'
import ActiveOrdersDriver from '../components/orders/ActiveOrdersDriver.jsx'
import ActiveOrdersRestaurant from '../components/orders/ActiveOrdersRestaurant.jsx';
import { lokalStorage } from '../features/importsIndex.jsx';

const ActiveUserOrders = () => {

  const loggedUserType=()=>lokalStorage("get","loggedUser").userType;

  return (
    <div>
      {loggedUserType()==="Driver"?<ActiveOrdersDriver/>:<ActiveOrdersRestaurant/>}
        
    </div>
  )
}

export default ActiveUserOrders;