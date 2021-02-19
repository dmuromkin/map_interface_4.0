import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOsm from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
import { defaults as defaultControls } from "ol/control";
import { connect } from "react-redux";
import Table from "./Components/TablePoints";
import { ShowCoords, AddLayer, AddPoint, ZoomMarker } from "./Components/AppLogic";
import "./App.css";
import "ol/ol.css";
import "antd/dist/antd.css";

import { MapComponent } from "@terrestris/react-geo";

const layer = new OlLayerTile({
  source: new OlSourceOsm(),
});

let mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: "EPSG:4326",
});

const center = fromLonLat([30.342656, 59.926291]);

let pointLayer = AddLayer(center);

const map = new OlMap({
  controls: defaultControls().extend([mousePositionControl]),
  view: new OlView({
    center: center,
    zoom: 10,
  }),
  layers: [layer, pointLayer],
});

class App extends Component {
  render() {
    let store = this.props;
    map.on("click", function (evt) {
      ZoomMarker(evt, store, map);
    });
    return (
      <div className="App">
        <div
          style={{
            textAlign: "left",
            paddingLeft: "50px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          APP MAP
        </div>
        <div className="mapField">
          <button className="addBtn" onClick={() => AddPoint(store, map)}>
            Add Point
          </button>
          <MapComponent map={map} />
        </div>
        <Table store={store} map={map} onClicks={ShowCoords} />
      </div>
    );
  }
}
export default connect(
  (state) => ({
    currState: state,
  }),
  (dispatch) => ({
    onAddPoint: (newpoint) => {
      dispatch({ type: "ADD_POINT", payload: newpoint });
    },
  })
)(App);
