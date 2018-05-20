import React from 'react';

// "bottom: 40px; left: 10px; top: auto; right: auto"

const Options = props => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        boxShadow: '0px 0px 10px #9ecaed',
        border: '3px solid #9ecaed',
        borderRadius: 5,
        top: 'auto',
        left: 10,
        bottom: 40,
        right: 'auto',
        background: '#172236',
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 12,
      }}
    >
      <div
        style={{
          padding: 10,
          display: 'flex',
        }}
      >
        <button
          style={{
            marginRight: 10,
            color: '#fff',
            background: 'green',
            border: 'none',
            borderRadius: 4,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 12,
            cursor: 'pointer',
          }}
          onClick={props.onReset}
        >
          Reset
        </button>
        <button
          style={{
            padding: 5,
            color: '#fff',
            background: '#ff00de',
            border: 'none',
            borderRadius: 4,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 12,
            cursor: 'pointer',
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
