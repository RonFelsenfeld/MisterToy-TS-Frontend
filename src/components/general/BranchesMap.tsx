import { MapContainer, Marker, TileLayer, Popup, useMap, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { toyService } from '../../services/toy.service'

const startingCoords = { lat: 32.073591208159584, lng: 34.79064056091309 }

const BranchesMap = () => {
  const branches = toyService.getStoreBranches()
  const zoomLevel = 13

  const MapClickHandler = () => {
    const map = useMap()

    useMapEvent('click', event => {
      const { lat, lng } = event.latlng
      map.setView([lat, lng], map.getZoom())
    })
    return null
  }

  return (
    <div className="map">
      <MapContainer
        center={startingCoords}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {branches.map(({ city, coords }, idx) => {
          return (
            <Marker position={coords} key={Math.random() + idx}>
              <Popup>
                <span style={{ fontSize: '14px' }}>{`📍 ${city}`}</span>
              </Popup>
            </Marker>
          )
        })}

        <MapClickHandler />
      </MapContainer>
    </div>
  )
}

export default BranchesMap
