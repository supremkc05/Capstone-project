import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';


function FitBounds({ coords, viewAll }) {
  const map = useMap();
  useEffect(() => {
    if (viewAll && coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [coords, viewAll, map]);
  return null;
}

function ChangeMapCenter({ center, viewAll }) {
  const map = useMap();
  useEffect(() => {
    if (!viewAll) {
      map.setView(center);
    }
  }, [center, viewAll, map]);
  return null;
}

export default function Map({ markerPosition, allCoords = [], viewAll }) {
  return (
    <MapContainer center={markerPosition} zoom={15} style={{ height: "100%", minHeight: "200px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {viewAll ? (
        <MarkerClusterGroup>
          {allCoords.map((pos, idx) => <Marker key={idx} position={pos} />)}
        </MarkerClusterGroup>
      ) : (
        <Marker position={markerPosition} />
      )}
      <ChangeMapCenter center={markerPosition} viewAll={viewAll} />
      <FitBounds coords={allCoords} viewAll={viewAll} />
    </MapContainer>
  )
}