import React from "react";

// "top: 10px;right: 10px bottom: auto;left:auto"

const Status = props => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        boxShadow: "0px 1px 4px rgba(0, 0, 0, .3)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        top: 10,
        left: "auto",
        bottom: "auto",
        right: 10,
        background: "#fff"
      }}
    >
      <div style={{ padding: 10 }}>
        {props.won && <h1 style={{ color: "green" }}>You Won !</h1>}
        {props.targets &&
          props.targets.features.length && (
            <div style={{ textAlign: "center" }}>
              <h3>Targets Left</h3>
              <h1
                style={{
                  color: "red",
                  fontSize: 45,
                  margin: 0,
                  marginBottom: 20
                }}
              >
                {props.targets.features.length}
              </h1>
            </div>
          )}
      </div>
    </div>
  );
};

export default Status;
