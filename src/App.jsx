import { useState } from 'react'
import './App.css'
import PhoneCallButton from './components/test.jsx';
import CheckEmail from './components/EmailVerification.jsx';

function App() {
  const [location, setLocation] = useState("")
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
 
  function success(pos) {
    const crd = pos.coords;
    setLocation(`${crd.latitude},"---", ${crd.longitude}`)
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
 
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
 const getLocation=()=>{
  navigator.geolocation.getCurrentPosition(success, error, options);

 }
  return (
    <div className="App">
      <button onClick={()=>alert("test branch")}>click me to open alert</button>
       <PhoneCallButton/>
        <button onClick={getLocation}>
          getLocation
        </button>
      {location&&location}
   
   <CheckEmail/>
    </div>
  )
}

export default App
