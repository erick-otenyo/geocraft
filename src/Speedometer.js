/* eslint-disable no-template-curly-in-string */
import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

// "top: 10px;right: 10px bottom: auto;left:auto"

const Speedometer = ({ maxSpeed, currentSpeed }) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        boxShadow: '0px 0px 10px #9ecaed',
        border: '3px solid #9ecaed',
        borderRadius: 5,
        top: 10,
        left: 'auto',
        bottom: 'auto',
        right: 10,
        background: '#172236',
        
      }}
    >
      <div style={{ padding: 10 }}>
        <ReactSpeedometer
          width={200}
          height={150}
          segments={10}
          ringWidth={10}
          value={currentSpeed}
          needleTransitionDuration={100}
          needleColor="#fff"
          startColor="#33CC33"
          endColor="#FF471A"
          valueFormat="d"
          maxValue={maxSpeed}
          currentValueText="${value} km/h"
        />
      </div>
    </div>
  );
};

export default Speedometer;
