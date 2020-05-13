// App initialization code goes here
import L from 'leaflet';
import { kml } from '@mapbox/leaflet-omnivore';
// import { atlas_projects } from './atlas_case_study';
import { atlas_full } from './atlas_full';
import { layerStyle, ptLayer, onEachFeature, map } from './map';

var myCustomGroup = L.geoJSON(null, {
    style: layerStyle,
    pointToLayer: ptLayer,
    onEachFeature: onEachFeature
});
kml.parse(atlas_full, null, myCustomGroup).addTo(map);

