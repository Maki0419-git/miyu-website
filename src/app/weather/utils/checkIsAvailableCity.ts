import { CityCountyData } from "../data/CityCountyData"

export default function checkIsAvailableCity(city: string) {
	for (const data of CityCountyData) {
		if (data.cityName === city) return
	}

	throw new Error(`City ${city} is not available.`)
}
