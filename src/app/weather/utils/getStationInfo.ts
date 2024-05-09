import { CityCountyData } from "../data/CityCountyData"

export function getStationInfo(city: string) {
	for (const data of CityCountyData) {
		if (data.cityName === city) return data.stationName
	}
	throw new Error(`City ${city} is not available.`)
}
