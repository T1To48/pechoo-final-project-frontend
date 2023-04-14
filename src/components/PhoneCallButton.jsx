import React from 'react';

const PhoneCallButton=()=> {
  const handlePhoneCall = () => {
    window.location.href = 'tel:0545-846-820'; // Replace with the phone number you want to call
  }

  return (
    <button onClick={handlePhoneCall}>Call now</button>
  );
}

export default PhoneCallButton;