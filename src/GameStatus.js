import React from 'react';

// "top: 180px;right: auto; bottom: auto;left:10px"

const Status = props => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        boxShadow: '0px 0px 10px #9ecaed',
        border: '3px solid #9ecaed',
        borderRadius: 5,
        top: 180,
        left: 10,
        bottom: 'auto',
        right: 'auto',
        background: '#172236',
      }}
    >
      <div
        style={{ padding: 10, textAlign: 'center', width: 120, height: 120 }}
      >
        {props.won && <h1 style={{ color: 'green' }}>You Won !</h1>}
        {props.targets &&
          props.targets.features.length && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#fff' }}>Targets Left</h3>
              <h1
                style={{
                  color: '#fff',
                  textShadow:
                    '0px 0px 2px rgba(255,255,255,1) , 0px 0px 5px rgba(255,255,255,1) , 0px 0px 10px rgba(255,255,255,1) , 0px 0px 15px #ff00de , 0px 0px 25px #ff00de , 0px 0px 35px #ff00de , 0px 0px 45px #ff00de',
                  fontSize: 45,
                  margin: 0,
                  marginBottom: 20,
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
