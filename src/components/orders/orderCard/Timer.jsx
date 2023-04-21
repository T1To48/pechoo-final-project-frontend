import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React from "react";

const Timer = ({seconds }) => {
  const totalTime = seconds;

  const renderTime = ({ remainingTime }) => {
    const remainingSeconds = remainingTime % 60;
    const remainingMinutes = Math.floor(remainingTime / 60);

    return (
      <div style={{ color: "#CD6D0C" }}>
        {remainingMinutes > 0 ? (
          <div style={{ textAlign: "center" }}>
            <div >
              {remainingMinutes > 0 && remainingMinutes + 1}
            </div>
            <div className="label">Minutes</div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div >{remainingSeconds}</div>
            <div >Seconds</div>
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
        height: "fit-content",
        width: "fit-content",
        borderRadius: "90px"
      }}
      className="timer-wrapper"
    >
      <CountdownCircleTimer
        isPlaying
        duration={totalTime}
        colors="#CD6D0C"
        trailColor="black"
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
