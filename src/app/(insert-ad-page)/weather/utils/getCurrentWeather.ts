import errorHandler from "@/utils/errorHandler"
import { getCityInfo } from "./getStationInfo"
import { getWeatherApiEndpoint } from "./getWeatherApiEndpoint"
import { WeatherAPIResponse } from "../types"

export async function getCurrentWeather(cityName: string[]): Promise<WeatherAPIResponse<"CURRENT_WEATHER">> {
	try {
		const availableStations = cityName.map((city) => getCityInfo(city, "stationName"))
		const endpoint = getWeatherApiEndpoint("CURRENT_WEATHER")
		const response = await fetch(
			`${endpoint}?StationName=${availableStations.join(",")}&Authorization=${process.env.WEATHER_API_KEY}`,
			{ next: { revalidate: 60 * 10 } },
		)

		if (!response.ok) {
			errorHandler("CURRENT_WEATHER", response.status)
		}

		const data = await response.json()

		return data
	} catch (error: any) {
		throw error
	}
}
