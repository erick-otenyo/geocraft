import React, { Component } from "react";
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
import { randomPoint, circle as makeCircle } from "@turf/turf";

import { initialPoint, AOI } from "./gamedata";
import { pointWithin, getRandomTarget } from "./utils";
import DistanceLabel from "./DistanceLabel";
import Instructions from "./GameInstructions";
import Options from "./GameOptions";
import Status from "./GameStatus";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q"
});

// initial app state
const initialState = {
  point: initialPoint,
  mapReady: false,
  distance: 0,
  gameStarted: false,
  direction: 0,
  activeTarget: null,
  speed: 0,
  maxSpeed: 0.035
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  startGame = () => {
    if (this.state.mapReady) {
      // start updating positions
      const taskId = window.setInterval(this.setPosition, 10);
      // set target areas
      this.randomTargets();
      // add event listners for arrow keys
      document.body.addEventListener("keydown", this.handleKeyDown, true);
      document.body.addEventListener("keyup", this.handleKeyUp, true);
      // game started !
      this.setState({ gameStarted: true, taskId: taskId, won: false });
    }
  };
  resetGame = () => {
    // reset to inital state
    this.setState({
      ...initialState,
      mapReady: true,
      gameStarted: true,
      won: false
    });
    // reset randomTargetAreas
    this.map.setCenter(initialPoint.coordinates);
    this.randomTargets();
  };
  cancelGame = () => {
    // stop position updates
    window.clearInterval(this.state.taskId);
    // remove event listeners
    document.body.removeEventListener("keydown", this.handleKeyDown, true);
    document.body.removeEventListener("keyup", this.handleKeyUp, true);
    // set map center
    const { won } = this.state;
    this.setState({
      ...initialState,
      mapReady: true,
      won: won
    });
  };
  onStyleLoad = e => {
    this.map = e;
    // the map style is fully loaded
    this.setState({ mapReady: true });
  };
  setPosition = () => {
    if (this.state.targetAreas && this.state.targetAreas.features.length) {
      const { speed, direction, point } = this.state;
      // update coordinates
      point.coordinates[0] += speed * Math.sin(direction) / 100;
      point.coordinates[1] += speed * Math.cos(direction) / 100;

      //set our drone to updated position
      this.map.getSource("drone").setData(point);
      // rotate the drone icon as necessary
      this.map.setLayoutProperty(
        "drone",
        "icon-rotate",
        direction * (180 / Math.PI)
      );
      // game not done

      // get the active feature
      const activeTargetFeature = this.state.targetAreas.features[
        this.state.activeTarget
      ];

      // determine how far the drone is from target and if is within targert
      const { isWithin, distance } = pointWithin(point, activeTargetFeature);
      // perfom the app logic
      this.handleIsWithin(isWithin, distance);
      this.setState({ point: point });
      this.map.setCenter(point.coordinates);
    } else {
      this.setState({ won: true });
      this.cancelGame();
    }
  };

  handleIsWithin = (isWithin, distance) => {
    if (isWithin) {
      const { targetAreas } = this.state;
      // remove the found target feature
      const targetAreasFeatures = [...targetAreas.features];
      targetAreasFeatures.splice(this.state.activeTarget, 1);
      // get the next random target
      const nextTarget = getRandomTarget(targetAreasFeatures);
      // set the new data and the active target
      targetAreas.features = targetAreasFeatures;
      this.setState({ targetAreas: targetAreas, activeTarget: nextTarget });
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
    // slow down gradually
    if (this.state.speed > 0) {
      this.setState({ speed: speed });
      setTimeout(this.slowDown, 10);
    }
  };
  randomTargets = (number = 3) => {
    // get random points within our AOI
    const points = randomPoint(number, { bbox: AOI });
    // generate circle from the random points
    const circles = { type: "FeatureCollection", features: [] };
    circles.features = points.features.map(point => {
      return makeCircle(point, 30, { stpes: 80, units: "metres" });
    });
    // set 1 random circle feature as active target
    const activeTarget = getRandomTarget(circles.features);
    // update state
    this.setState({ targetAreas: circles, activeTarget: activeTarget });
  };
  render() {
    return (
      <Map
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={initialPoint.coordinates}
        zoom={[17]}
        style="mapbox://styles/mapbox/streets-v8"
        onStyleLoad={this.onStyleLoad}
      >
        {this.state.targetAreas &&
          this.state.gameStarted && (
            <Source
              id="target-area"
              geoJsonSource={{
                type: "geojson",
                data: this.state.targetAreas.features[this.state.activeTarget]
              }}
            />
          )}
        {this.state.point && (
          <div>
            <Source
              id="drone"
              geoJsonSource={{ type: "geojson", data: this.state.point }}
            />
            <Layer
              id="drone-glow"
              type="circle"
              sourceId="drone"
              paint={{
                "circle-radius": 40,
                "circle-color": "grey",
                "circle-opacity": 0.5
              }}
            />
            <Layer
              id="drone-glow-strong"
              type="circle"
              sourceId="drone"
              paint={{
                "circle-radius": 18,
                "circle-color": "#fff",
                "circle-opacity": 1
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
          </div>
        )}

        {!this.state.gameStarted &&
          this.state.mapReady && (
            <Instructions onStart={this.startGame} won={this.state.won} />
          )}
        {this.state.distance && (
          <DistanceLabel distance={this.state.distance} />
        )}
        {this.state.targetAreas && <Status targets={this.state.targetAreas} />}
        {this.state.won && <Status won />}

        {this.state.gameStarted && (
          <Options onReset={this.resetGame} onCancel={this.cancelGame} />
        )}

        {this.state.targetAreas &&
          this.state.distance &&
          this.state.distance < 0.2 && (
            <div>
              <Layer
                id="target-area"
                type="fill"
                sourceId="target-area"
                paint={{
                  "fill-color": "#fff"
                }}
              />
              <Layer
                id="target-area-outline"
                type="line"
                sourceId="target-area"
                paint={{
                  "line-color": "green",
                  "line-width": 10,
                  "line-offset": 5
                }}
              />
            </div>
          )}
      </Map>
    );
  }
}

export default App;
