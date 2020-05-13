import L from "leaflet";
import "geotiff";
import { map } from "./map";
import "leaflet-canvaslayer-field/dist/leaflet.canvaslayer.field";

const setParent = (control, newElementId) => {
  //  change the div element that houses the control layer
  console.log(
    "document.getElementById(newElementId) ",
    document.getElementById(newElementId)
  );
  document.getElementById(newElementId).appendChild(control.getContainer());
};
const addProgress = () => progress.classList.remove("hide");
const removeProgress = () => progress.classList.add("hide");

const createColorScale = function(colName, geoRange) {
  const tifColorScales = {
    blueYellowRedPlusNodata: [
      "#1C00ff00",
      "white",
      "#0d2463",
      "#3556b0",
      "#f5f516",
      "red",
    ],
    viridisColsPlusNodata: [
      "#1C00ff00",
      "white",
      "#440154",
      "#482777",
      "#3f4a8a",
      "#31678e",
      "#26838f",
      "#1f9d8a",
      "#6cce5a",
      "#b6de2b",
      "#fee825",
    ],
  };
  let noOfColorsInScale = tifColorScales[colName].length - 2;
  let geoVal = geoRange / noOfColorsInScale;
  let csDomain = [-1, 0];
  // get the length of the array of colors being used. Divide the max nunmber
  // by this and then add fractions of this number to the domain to match colors
  [...Array(noOfColorsInScale).keys()]
    .map((i) => i + 1)
    .forEach((val) => csDomain.push(geoVal * val));
  return chroma
    .scale(tifColorScales[colName])
    .nodata("#1C00ff00")
    .domain(csDomain);
};

const loadTiffasLayer = function(tiffName, colName) {
  // load a tiff as a layer on the map
  // get the data and create a new ScalarField
  // create new layer from this scalarField and add it to the map
  // map layer clickable to get values from layer
  // add the layer to the control and the map
  addProgress();
  return d3
    .request("/api/" + tiffName)
    .responseType("arraybuffer")
    .get(function(error, tiffData) {
      let bandIndex = 0;
      let geo = L.ScalarField.fromGeoTIFF(tiffData.response, bandIndex);
      let layerGeo = L.canvasLayer
        .scalarField(geo, {
          color: createColorScale(colName, geo.range[1]),
          opacity: 0.65,
        })
        .addTo(map);

      // layerGeo.on('click', function (e) {
      //     if (e.value > 0 ) {
      //         let v = e.value.toFixed(2);
      //         let html = (`<span class="popupText">Val: ${v}</span>`);
      //         let popup = L.popup()
      //             .setLatLng(e.latlng)
      //             .setContent(html)
      //             .openOn(map);
      //     }
      // });

      uploadLayerControl.addOverlay(layerGeo, tiffName);
      removeProgress();
    });
};

const progress = document.querySelector("#progress");
const activeLayerControl = L.control.layers({}, {}, {});

const uploadLayerControl = L.control.layers(
  {},
  {},
  {
    position: "bottomright",
    collapsed: false,
  }
);

uploadLayerControl.addTo(map);
setParent(uploadLayerControl, "upload-layers");
activeLayerControl.addTo(map);
setParent(activeLayerControl, "active-layers-control");

export { setParent, loadTiffasLayer, uploadLayerControl };
