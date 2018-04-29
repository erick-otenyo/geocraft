import React from "react";

const DistanceLabel = ({ distance }) => {
  let formattedDistance;
  if (distance >= 1) {
    formattedDistance = `${Math.floor(distance)} km`;
  } else {
    formattedDistance = `${Math.floor(distance * 1000)} m`;
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        display: "flex",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, .3)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        top: 10,
        left: 10,
        bottom: "auto",
        right: "auto",
        background: "#fff"
      }}
    >
      <div style={{ padding: 10, textAlign: "center" }}>
        <h2> You are about</h2>
        <h3
          style={{
            color: "green",
            fontSize: 35,
            margin: 0,
            marginBottom: 20
          }}
        >
          {formattedDistance}
        </h3>
        <h2>away</h2>
      </div>
    </div>
  );
};

export default DistanceLabel;
