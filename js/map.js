// place any jQuery/helper plugins in here, instead of separate, slower script files.
import L from "leaflet";
import M from "materialize-css";
import { irishCounties } from "./irishCountiesGeo";
const baseLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  {
    id: "Base Layer",
    attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
    maxZoom: 16,
  }
);
const zoomControl = L.control.zoom({
  position: "topright",
});

const map = L.map("map", {
  zoomControl: false,
}).setView([53.5, -8.2], 8);

map.addControl(zoomControl);
baseLayer.addTo(map);
zoomControl.addTo(map);

// Add Classes Zoom control Buttons.
const addClassToControl = (item) =>
  item.classList.add(
    "btn-floating",
    "btn",
    "waves-effect",
    "waves-light",
    "atlas-blue",
    "white-text",
    "control-fab"
  );
[
  ...document.getElementsByClassName("leaflet-control-zoom-in"),
].forEach((item) => addClassToControl(item));
[
  ...document.getElementsByClassName("leaflet-control-zoom-out"),
].forEach((item) => addClassToControl(item));
[
  ...document.getElementsByClassName("leaflet-control-zoom"),
][0].classList.remove("leaflet-bar");

const geojson = L.geoJson(irishCounties).addTo(map);

export { map };
