
import { useDispatch } from 'react-redux';

const Currentlocation =()=> {
  const dispatch = useDispatch();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
 
   function success(pos) {
    const {latitude,longitude} = pos.coords;
    return `${latitude},${longitude}`
  }
 
  function error(err) {
    console.log(`ERROR(${err.code}): ${err.message}`);
  }
  return navigator.geolocation.getCurrentPosition(success, error, options);

 
}

export default Currentlocation;
