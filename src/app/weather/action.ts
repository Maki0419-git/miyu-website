"use server"

import errorHandler from "@/utils/errorHandler"
import { WeatherAPIResponse } from "./types"
import { getWeatherApiEndpoint } from "./utils/getWeatherApiEndpoint"
import { getCityInfo } from "./utils/getStationInfo"
import { UNSPLASH_API_BASE_URL } from "./constant"

export async function getCurrentWeather(cityName: string[]): Promise<WeatherAPIResponse<"CURRENT_WEATHER">> {
	try {
		const availableStations = cityName.map((city) => getCityInfo(city, "stationName"))
		const endpoint = getWeatherApiEndpoint("CURRENT_WEATHER")
		const response = await fetch(
			`${endpoint}?StationName=${availableStations.join(",")}&Authorization=${process.env.WEATHER_API_KEY}`,
			{ cache: "no-store" },
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

export async function getCityImage(city: string) {
	try {
		const englishName = getCityInfo(city, "englishName")
		const response = await fetch(`${UNSPLASH_API_BASE_URL}?query=${englishName}`, {
			headers: {
				Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
			},
		})
		if (!response.ok) {
			errorHandler("RANDOM_CITY_PHOTO", response.status)
		}
		const data = await response.json()
		const requiredData = {
			url: data.urls.raw,
			id: data.id,
			blurHash: data.blur_hash,
			alternativeSlugs: data.alternative_slugs,
		}
		return requiredData
	} catch (error) {
		throw error
	}
}
