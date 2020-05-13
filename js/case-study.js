// place any jQuery/helper plugins in here, instead of separate, slower script files.
import L from "leaflet";
import $ from "jquery";
import M from 'materialize-css';
import { map, atlasLayerControl } from "./map";
import "leaflet-canvaslayer-field/dist/leaflet.canvaslayer.field";
import { setParent, loadTiffasLayer, uploadLayerControl } from "./layer-control";
import { selectInst, modalInst } from "./material";

// loop through each layer in atlasLayers and add to map as an overlay
atlasLayerDict.forEach(function(layer) {
  let parsedlayer = JSON.parse(layer);
  let leafletLayer = L.tileLayer.wms(
    "http://www.atlas-horizon2020.eu/gs/ows?", {
      layers: parsedlayer.layer,
      opacity: 0.8,
      format: "image/png",
      transparent: true,
    }
  );
  atlasLayerControl.addOverlay(leafletLayer, parsedlayer.title);
});

atlasLayerControl.addTo(map);
setParent(atlasLayerControl, "atlas-layers");

loadTiffasLayer("cumulative_imp_wgs84.tif", "blueYellowRedPlusNodata");

const handleUpload = event => {
  // stop the form submitting
  // and get the type of layer it is 
  event.preventDefault();  
  var formData = new FormData(document.getElementById('upload-form'));
  fetch(event.target.action, {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    M.toast({html: data.message, classes: 'green'});
    M.toast({html: data.filepath, classes: 'green'});
    loadTiffasLayer(data.filepath, "viridisColsPlusNodata");
  })
}

const hideAndSeek = function(el1, el2) {
  document.getElementById(el1).classList.remove("no-display");
  document.getElementById(el2).classList.add("no-display");
};

document.querySelectorAll('input[name="type"]').forEach((radioBut) => {
  radioBut.addEventListener("click", (e) => {
    e.target.value === "pressure"
      ? hideAndSeek("pressures", "eco_comps")
      : hideAndSeek("eco_comps", "pressures");
  });
});

document.querySelector('form').addEventListener('submit', handleUpload);