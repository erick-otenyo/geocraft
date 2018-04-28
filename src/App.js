import React, { Component } from "react";
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";

import { initialPoint, targetArea } from "./gamedata";
import { pointWithin } from "./utils";
import DistanceLabel from "./DistanceLabel";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: initialPoint,
      direction: 0,
      speed: 0,
      maxSpeed: 0.035
    };
  }
  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyDown, true);
    document.body.addEventListener("keyup", this.handleKeyUp, true);
  }
  onStyleLoad = e => {
    this.map = e;
    window.setInterval(this.setPosition, 10);
  };
  setPosition = () => {
    const { speed, direction, point } = this.state;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    this.map.getSource("drone").setData(point);
    this.map.setLayoutProperty(
      "drone",
      "icon-rotate",
      direction * (180 / Math.PI)
    );
    if (!this.state.won) {
      const { isWithin, distance } = pointWithin(point, targetArea);
      this.handleIsWithin(isWithin, distance);
    }
    this.setState({ point: point });
    this.map.setCenter(point.coordinates);
  };

  handleIsWithin = (isWithin, distance) => {
    if (isWithin) {
      this.setState({ won: true, distance: 0 });
      console.log("won");
    } else {
      this.setState({ distance: distance });
    }
  };

  handleKeyDown = e => {
    // left arrow key
    if (e.which === 37) {
      this.setState({ direction: this.state.direction - 0.1 });
    }
    // right arrow key
    if (e.which === 39) {
      this.setState({ direction: this.state.direction + 0.1 });
    }

    // up arrow key  - accelerate
    if (e.which === 38) {
      let { speed } = this.state;
      // speed limit
      if (speed < this.state.maxSpeed) {
        speed = Math.min(speed + 0.0001, 0.5);
      }
      this.setState({ speed: speed });
      e.preventDefault();
    }
    // down arrow key- slow down gradually
    if (e.which === 40) {
      let { speed } = this.state;
      if (speed > 0) {
        speed = Math.max(speed - 0.0001, 0);
      }
      this.setState({ speed: speed });
      e.preventDefault();
    }
  };
  handleKeyUp = e => {
    // on release up arrow key  - slow down gradually
    if (e.which === 38) {
      this.slowDown();
      e.preventDefault();
    }
  };
  slowDown = () => {
    const speed = Math.max(this.state.speed - 0.0001, 0);
    if (this.state.speed > 0) {
      this.setState({ speed: speed });
      setTimeout(this.slowDown, 10);
    }
  };
  render() {
    return (
      <Map
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={[37.0105, -1.0891]}
        zoom={[17]}
        style="mapbox://styles/mapbox/streets-v8"
        onStyleLoad={this.onStyleLoad}
      >
        <Source
          id="drone"
          geoJsonSource={{ type: "geojson", data: this.state.point }}
        />
        <Source
          id="target-area"
          geoJsonSource={{ type: "geojson", data: targetArea }}
        />
        <Layer
          id="drone-glow-strong"
          type="circle"
          sourceId="drone"
          paint={{
            "circle-radius": 18,
            "circle-color": "#fff",
            "circle-opacity": 0.9
          }}
        />
        <Layer
          id="drone-glow"
          type="circle"
          sourceId="drone"
          paint={{
            "circle-radius": 40,
            "circle-color": "#fff",
            "circle-opacity": 0.4
          }}
        />
        <Layer
          id="drone"
          type="symbol"
          sourceId="drone"
          layout={{
            "icon-image": "airport-15",
            "icon-rotation-alignment": "map"
          }}
        />
        {this.state.distance && (
          <DistanceLabel distance={this.state.distance} />
        )}
        {this.state.distance &&
          this.state.distance < 0.2 && (
            <Layer
              id="target-area"
              type="fill"
              sourceId="target-area"
              paint={{
                "fill-color": "green"
              }}
            />
          )}
      </Map>
    );
  }
}

export default App;
