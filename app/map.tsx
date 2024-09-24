'use client'

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

export default function Map() {
    return (
        <div>
            <MapContainer
                center={[37.541885, -77.440624]}
                zoom={13}
                style={{ height: 500, width: 500 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[37.541885, -77.440624]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}