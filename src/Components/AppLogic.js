import { fromLonLat, toLonLat } from "ol/proj";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { Vector as VectorLayer } from "ol/layer";

export function ShowCoords(id, store, map) {
  console.log(store.currState);
  let s = store.currState[id];
  var new_center = fromLonLat([s[1], s[0]]);
  map.getView().setCenter(new_center);
  map.getView().setZoom(13);
}

export function AddLayer(center) {
  var iconFeature = new Feature({
    geometry: new Point(center),
  });
  var iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src:
        "https://icons.iconarchive.com/icons/paomedia/small-n-flat/48/map-marker-icon.png",
    }),
  });

  iconFeature.setStyle(iconStyle);

  var vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [iconFeature],
    }),
  });

  return vectorLayer;
}

export function AddPoint(store, map) {
  map.once("click", function (evt) {
    let coords = toLonLat(evt.coordinate);
    let newpoint = [
      parseFloat(coords[1].toFixed(6)),
      parseFloat(coords[0].toFixed(6)),
    ];
    store.onAddPoint(newpoint);
    let pointLayer = AddLayer(evt.coordinate);
    map.addLayer(pointLayer);
  });
}

export function ZoomMarker(evt, store, map) {
  let coord = toLonLat(evt.coordinate);
  let xd = coord[0];
  let yd = coord[1];
  store.currState.forEach((element) => {
    let x = element[1];
    let y = element[0];
    console.log(yd - y);
    if (Math.abs(xd - x) < 0.02 && yd - y > -0.001 && yd - y < 0.03) {
      var new_center = fromLonLat([x, y]);
      map.getView().setCenter(new_center);
      map.getView().setZoom(13);
    }
  });
}
