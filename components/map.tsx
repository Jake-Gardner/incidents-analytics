'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

interface Props {
    latitude: number
    longitude: number
}

export default function Map({ latitude, longitude }: Props) {
    return (
        <div>
            <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                style={{ height: 500, width: 500 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}