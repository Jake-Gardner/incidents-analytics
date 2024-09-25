export interface Incident {
    address: {
        latitude: number
        longitude: number
    },
    description: {
        event_opened: string
    }
}

export interface Weather {
    temperatureF: number
    windSpeedMPH: number
    weatherDescription: string
}
