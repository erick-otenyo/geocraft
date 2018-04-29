import React from "react";

// "bottom: 10px; left: 10px; top: auto; right: auto"

const Options = props => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        boxShadow: "0px 1px 4px rgba(0, 0, 0, .3)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        top: "auto",
        left: 10,
        bottom: 40,
        right: "auto",
        background: "#fff"
      }}
    >
      <div
        style={{
          padding: 10,
          display: "flex"
        }}
      >
        <button
          style={{
            marginRight: 10,
            color: "#fff",
            background: "green",
            border: "none",
            borderRadius: 4
          }}
          onClick={props.onReset}
        >
          Reset
        </button>
        <button
          style={{
            padding: 5,
            color: "#fff",
            background: "red",
            border: "none",
            borderRadius: 4
          }}
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Options;
