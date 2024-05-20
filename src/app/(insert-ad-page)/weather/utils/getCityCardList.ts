import { CityPictureAPIResponse, CurrentWeatherRecords } from "../types"

export type CityCardType = {
	cityName: string
	temperature: number
	weather: string
	url: string
	id: string
	imgDataURL?: string
}

type Props = {
	currentWeatherRecords: CurrentWeatherRecords
	imageData: CityPictureAPIResponse[]
	recentPlace: string[]
}

export function getCityCardList({ currentWeatherRecords, imageData, recentPlace }: Props) {
	const cityCardList: CityCardType[] = []
	currentWeatherRecords.Station.forEach((station) => {
		const cityCardIndex = recentPlace.indexOf(station.GeoInfo.CountyName)
		cityCardList[cityCardIndex] = {
			cityName: station.GeoInfo.CountyName,
			temperature: station.WeatherElement.AirTemperature,
			weather: station.WeatherElement.Weather,
			url: imageData[cityCardIndex].url,
			id: imageData[cityCardIndex].id,
			imgDataURL: imageData[cityCardIndex]?.dataURL,
		}
	})

	return cityCardList
}
