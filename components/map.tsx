'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Incident } from '../types'

interface Props {
    incident: Incident
}

export default function Map({
    incident: {
        address: { latitude, longitude, common_place_name, address_line1 }
    }
}: Props) {
    return (
        <div style={{ margin: 15 }}>
            <MapContainer
                center={[latitude, longitude]}
                zoom={16}
                style={{ height: 500, width: 500 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        {common_place_name}<br />{address_line1}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}