'use client'

import { useState, useEffect } from 'react'
import FileUpload from './fileUpload'
import Map from './map'
import { Incident, Weather } from '../types'
import { fetchWeather } from '../services/weatherService'

export default function IncidentAnalytics() {
    const [rawData, setRawData] = useState<Incident | undefined>()
    const [weather, setWeather] = useState<Weather | undefined>()

    useEffect(() => {
        if (rawData) {
            const call = async () => {
                const weatherRes = await fetchWeather(rawData)
                setWeather(weatherRes)
            }

            call()
        } else {
            setWeather(undefined)
        }
    }, [rawData])

    return (
        <div>
            <FileUpload setRawData={data => setRawData(data)} />
            {weather && <div style={{ margin: 15 }}>
                <h4>{weather.weatherDescription}</h4>
                <h4>{weather.temperatureF} &deg;F</h4>
                <h4>Wind {weather.windSpeedMPH} MPH</h4>
            </div>}
            {rawData && <Map latitude={rawData.address.latitude} longitude={rawData.address.longitude} />}
        </div>
    )
}
