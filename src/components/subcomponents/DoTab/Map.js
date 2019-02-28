import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

// the bug where the pins don't show
// https://github.com/PaulLeCam/react-leaflet/issues/453
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const PinIcon = new L.Icon({
  iconUrl: require(`../../../assets/icons/planner/place.svg`),

  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, 0]
});

const LeafletMap = ({ position }) => {
  return (
    <Map
      attributionControl={false}
      zoomControl={false}
      tap={false}
      scrollWheelZoom={false}
      boxZoom={false}
      dragging={false}
      center={position}
      zoom={16}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={position} icon={PinIcon} />
    </Map>
  );
};

export default LeafletMap;
