export interface Incident {
    address: {
        latitude: number
        longitude: number
        address_line1: string
        common_place_name: string
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
