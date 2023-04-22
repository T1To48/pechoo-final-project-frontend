import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React from "react";

const Timer = ({seconds }) => {
  const totalTime = seconds;

  const renderTime = ({ remainingTime }) => {
    const remainingSeconds = remainingTime % 60;
    const remainingMinutes = Math.floor(remainingTime / 60);

    return (
      <div >
        {remainingMinutes > 0 ? (
          <div style={{ textAlign: "center" }}>
            <div >
              {remainingMinutes > 0 && remainingMinutes + 1}
            </div>
            <div className="label">Min`</div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div >{remainingSeconds}</div>
            <div >Sec</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        overflow: "hidden",
        width: "fit-content",
        borderRadius: "50px",
        fontSize: "15px",
        padding:"0",
        margin: "0",
        color: "#CD6D0C"
      }}
    >
      <CountdownCircleTimer
        isPlaying
        duration={totalTime}
        colors="#CD6D0C"
        trailColor="black"
        size="60"
        strokeWidth="4"
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
