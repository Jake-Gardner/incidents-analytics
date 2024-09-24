'use client'

import { useState } from 'react'
import FileUpload from './fileUpload'
import Map from './map'
import { Incident } from '../types'

export default function IncidentAnalytics() {
    const [rawData, setRawData] = useState<Incident | undefined>()

    //todo: reload entire map on new file?
    return (
        <div>
            <FileUpload setRawData={data => setRawData(data)} />
            {rawData && <Map latitude={rawData.address.latitude} longitude={rawData.address.longitude} />}
        </div>
    )
}
