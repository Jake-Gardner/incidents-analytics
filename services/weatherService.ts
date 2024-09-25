import { fetchWeatherApi } from 'openmeteo'
import { Incident } from '../types'

const WEATHER_CODES = {
    '0': 'Clear',
    '1': 'Mainly clear',
    '2': 'Partly cloudy',
    '3': 'Cloudy',
    '45': 'Foggy',
    '48': 'Rime fog',
    '51': 'Light drizzle',
    '53': 'Drizzle',
    '55': 'Heavy drizzle',
    '56': 'Light freezing drizzle',
    '57': 'Freezing drizzle',
    '61': 'Light rain',
    '63': 'Rain',
    '65': 'Heavy rain',
    '66': 'Light freezing rain',
    '67': 'Freezing rain',
    '71': 'Light snow',
    '73': 'Snow',
    '75': 'Heavy snow',
    '77': 'Snow grains',
    '80': 'Light showers',
    '81': 'Showers',
    '82': 'Heavy showers',
    '85': 'Light snow showers',
    '86': 'Snow showers',
    '95': 'Thunderstorm',
    '96': 'Light thunderstorms with hail',
    '99': 'Thunderstorm with hail',
}

export const fetchWeather = async (data: Incident) => {
    const shortDate = data.description.event_opened.match(/\d\d\d\d-\d\d-\d\d/)[0]
    const params = {
        "latitude": data.address.latitude,
        "longitude": data.address.longitude,
        "start_date": shortDate,
        "end_date": shortDate,
        "hourly": ["temperature_2m", "weather_code", "wind_speed_10m", "wind_direction_10m"],
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph"
    }
    const url = "https://archive-api.open-meteo.com/v1/archive"
    const [response] = await fetchWeatherApi(url, params)

    const utcOffsetSeconds = response.utcOffsetSeconds()

    const hourly = response.hourly()!

    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

    const weatherData = {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        weatherCode: hourly.variables(1)!.valuesArray()!,
        windSpeed10m: hourly.variables(2)!.valuesArray()!,
        windDirection10m: hourly.variables(3)!.valuesArray()!,
    }

    const eventDate = new Date(data.description.event_opened)
    let eventIndex = weatherData.time.length - 1
    // The API returns results in an hourly list. This iterates over the times
    // in the list to find the index closest to the time of the event
    for (let i = 0; i < weatherData.time.length; i++) {
        if (eventDate < weatherData.time[i]) {
            eventIndex = Math.max(i - 1, 0)
            break
        }
    }

    return {
        temperatureF: (Math.round(weatherData.temperature2m[eventIndex] * 10) / 10),
        windSpeedMPH: (Math.round(weatherData.windSpeed10m[eventIndex] * 10) / 10),
        weatherDescription: WEATHER_CODES[weatherData.weatherCode[eventIndex].toString()]
    }
}