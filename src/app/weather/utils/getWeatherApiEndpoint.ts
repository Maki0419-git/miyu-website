import { WEATHER_API_BASE_URL } from "../constant"
import { WeatherAPI, WeatherApiAlias } from "../types"

export function getWeatherApiEndpoint(apiAlias: WeatherApiAlias) {
	switch (apiAlias) {
		case "CURRENT_WEATHER":
			return `${WEATHER_API_BASE_URL}/${WeatherAPI.CURRENT_WEATHER}`
		case "THIRTY_SIX_HOURS_WEATHER":
			return `${WEATHER_API_BASE_URL}/${WeatherAPI.THIRTY_SIX_HOURS_WEATHER}`
		case "SUNRISE_SUNSET_TIME":
			return `${WEATHER_API_BASE_URL}/${WeatherAPI.SUNRISE_SUNSET_TIME}`
		default:
			throw new Error(`Unknown Weather API Alias: ${apiAlias}`)
	}
}
