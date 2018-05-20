import React from 'react';

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
        position: 'absolute',
        zIndex: 10,
        display: 'flex',
        boxShadow: '0px 0px 10px #9ecaed',
        border: '3px solid #9ecaed',
        borderRadius: 5,
        top: 10,
        left: 10,
        bottom: 'auto',
        right: 'auto',
        background: '#172236',
      }}
    >
      <div
        style={{ padding: 10, textAlign: 'center', height: 120, width: 120 }}
      >
        <h2
          style={{
            color: '#fff',
          }}
        >
          You are about
        </h2>
        <h3
          style={{
            color: '#fff',
            fontSize: 35,
            textShadow:
              '0px 0px 2px rgba(255,255,255,1) , 0px 0px 5px rgba(255,255,255,1) , 0px 0px 10px rgba(255,255,255,1) , 0px 0px 15px #00ffff , 0px 0px 25px #00ffff , 0px 0px 35px #00ffff , 0px 0px 45px #00ffff',
            margin: 0,
            marginBottom: 20,
          }}
        >
          {formattedDistance}
        </h3>
        <h2 style={{ color: '#fff' }}>away</h2>
      </div>
    </div>
  );
};

export default DistanceLabel;
