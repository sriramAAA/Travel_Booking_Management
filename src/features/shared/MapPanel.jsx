import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapPanel({ lat, lng, name }) {
  return (
    <div className="map-frame" aria-label={`Map showing ${name}`}>
      <MapContainer center={[lat, lng]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}><Popup>{name}</Popup></Marker>
      </MapContainer>
    </div>
  )
}
