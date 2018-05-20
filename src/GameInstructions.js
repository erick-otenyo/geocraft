import React from 'react';

const Instructions = props => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        maxWidth: 350,
        boxShadow: '0px 0px 10px #9ecaed',
        border: '3px solid #9ecaed',
        borderRadius: 5,
        top: 10,
        left: 10,
        bottom: 'auto',
        right: 'auto',
        background: '#172236',
        color: '#eee',
      }}
    >
      <div style={{ padding: 10 }}>
        {!props.won && (
          <div style={{ fontSize: 14 }}>
            <h2 style={{ color: '#fff' }}>Welcome to GeoCraft !</h2>
            <p>
              This is a simple game I developed as part of understanding React
              and Mapbox GL
            </p>
            <p>
              As the pilot of the drone at the center of the map, you are tasked
              to survey some suspicious regions in the area on this map.
            </p>
            <p>
              You only have the distances to those areas from where your drone
              is. Once you are near by 200m, the target will be visible
            </p>
            <p>
              Find out those areas to successfully complete this challenge !
            </p>
            <p>Use keyboard arrow Keys to fly the drone.</p>
            <p>
              Interested on the source ?
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/erick-otenyo/geocraft"
              >
                Geocraft source code.
              </a>
              Feel free to open an issue or a PR!
            </p>
            <p>Have some fun!</p>
          </div>
        )}
      </div>
      <div style={{ padding: 10 }}>
        {props.won && (
          <h2
            style={{
              marginTop: 0,
              color: '#fff',
              textShadow:
                '0px 0px 2px rgba(255,255,255,1) , 0px 0px 5px rgba(255,255,255,1) , 0px 0px 10px rgba(255,255,255,1) , 0px 0px 15px #ff00de , 0px 0px 25px #ff00de , 0px 0px 35px #ff00de , 0px 0px 45px #ff00de',
            }}
          >
            Congrats! You did it..
          </h2>
        )}
        <button
          style={{
            height: 40,
            float: 'center',
            width: '100%',
            marginBottom: 10,
            fontSize: 25,
            color: '#fff',
            background: 'transparent',
            cursor: 'pointer',
            border: 'none',
            borderRadius: 4,
            textShadow:
              '0px 0px 2px rgba(255,255,255,1) , 0px 0px 5px rgba(255,255,255,1) , 0px 0px 10px rgba(255,255,255,1) , 0px 0px 15px #00ffff , 0px 0px 25px #00ffff , 0px 0px 35px #00ffff , 0px 0px 45px #00ffff',
            textAlign: 'center',
          }}
          onClick={props.onStart}
        >
          {props.won ? 'Start again' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default Instructions;
