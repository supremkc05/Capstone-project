import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer  center={[27.7326197, 85.380883]}  zoom={13}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
    </MapContainer>
  )
}
