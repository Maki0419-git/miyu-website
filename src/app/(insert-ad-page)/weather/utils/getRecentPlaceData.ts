import { CityPictureAPIResponse, WeatherAPIResponse } from "../types"

const getCurrentWeather = async (cityName: string) => {
	try {
		const response = await fetch(`api/weather/current?cityName=${cityName}`)
		if (!response.ok) {
			throw new Error("Failed to fetch weather data")
		}
		const { data } = await response.json()
		return data
	} catch (error) {
		throw error
	}
}

const getCityImage = async (city: string) => {
	try {
		const response = await fetch(`api/cityImage?cityName=${city}`)
		if (!response.ok) {
			throw new Error("Failed to fetch city image")
		}
		const { data } = await response.json()
		return data
	} catch (error) {
		throw error
	}
}

export async function getRecentPlaceData(recentPlace: string[]): Promise<{
	currentWeatherData: WeatherAPIResponse<"CURRENT_WEATHER">
	imageData: CityPictureAPIResponse[]
}> {
	try {
		const generateCityImagePromise = () => recentPlace.map(getCityImage)
		const [currentWeatherData, ...imageData] = await Promise.all([
			getCurrentWeather(recentPlace.join(",")),
			...generateCityImagePromise(),
		])

		return { currentWeatherData, imageData }
	} catch (error) {
		throw error
	}
}
