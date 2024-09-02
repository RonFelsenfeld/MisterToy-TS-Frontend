import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { Coords, toyService } from '../../services/toy.service'

const startingCoords = { lat: 32.073591208159584, lng: 34.79064056091309 }

const BranchesMap = () => {
  const [coords, setCoords] = useState<Coords>(startingCoords)
  const branches = toyService.getStoreBranches()
  const zoomLevel = 13

  return (
    <div className="map">
      <MapContainer
        center={startingCoords}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  )
}

export default BranchesMap
