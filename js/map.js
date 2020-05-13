// place any jQuery/helper plugins in here, instead of separate, slower script files.
import L from "leaflet";
import "sidebar-v2/js/leaflet-sidebar.js";
import M from 'materialize-css';
import { collapseInst } from './material';

const AtlasIcon = L.Icon.extend({});
const uniIcon = new AtlasIcon({ iconUrl: "static/build/img/university.png" });
const csIcon = new AtlasIcon({ iconUrl: "static/build/img/river-2.png" });
const sidebar = L.control.sidebar('sidebar');
const baseLayer = L.tileLayer('http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
  id: "Base Layer",
  attribution: '&copy; <a href="http://services.arcgisonline.com/arcgis/">Argis Online</a> contributors'
});

const atlasLayerControl = L.control.layers({}, {}, {
  position: 'bottomleft',
  collapsed: false
});


const zoomControl = L.control.zoom({
  position: 'topright'
});

const layerStyle = (feature) => {
  switch (feature.properties.styleUrl) {
    case "#poly-FFEA00-1801-120":
      return { color: "yellow" };
    case "#poly-FF5252-3701-120":
      return { color: "red" };
    case "#poly-FF5252-3201-112":
      return { color: "red" };
    default:
      return { color: "blue" };
  }
}

const ptLayer = function(feature, latlng){
  let markerIcon = (feature.properties.name.includes("Partner")) ? uniIcon : csIcon;
  let featName = feature.properties.name.toLowerCase();
  let iconId = featName.split(/(\d+)/).slice(0, 2).join('').replace(/\s/g, "");
  let collapseId = (featName.split(/(\d+)/).slice(0, 2)[1]) -1;
  return new L.marker(latlng, {
    icon: markerIcon,
    name: feature.properties.name,
    iconId: iconId,
    sidebarId: featName.split(" ")[0],
    collapseId: collapseId
  })
}

const onEachFeature = function(feature, layer) {
  layer.on({
    click: function(e) {
      sidebar.open(e.target.options.sidebarId);
      let inst =  M.Collapsible.getInstance(document.getElementById('case-study-collapse'));
      inst.open(e.target.options.collapseId);
    },
  });
}

const map = L.map('map', {
  zoomControl: false
}).setView([52, -20], 6);

sidebar.addTo(map);
sidebar.close()
map.addControl(sidebar);
map.addControl(zoomControl);
baseLayer.addTo(map);
zoomControl.addTo(map);

// Add Classes Zoom control Buttons. 
const addClassToControl = (item) => item.classList.add('btn-floating', 'btn', 'waves-effect', 'waves-light', 'atlas-blue', 'white-text', 'control-fab');
[...document.getElementsByClassName('leaflet-control-zoom-in')].forEach( item => addClassToControl(item));
[...document.getElementsByClassName('leaflet-control-zoom-out')].forEach( item => addClassToControl(item));
[...document.getElementsByClassName('leaflet-control-zoom')][0].classList.remove('leaflet-bar');

export { map, atlasLayerControl, ptLayer, onEachFeature, layerStyle, sidebar };
