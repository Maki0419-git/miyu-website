import { CustomError } from "@/utils/errorHandler"
import { CityCounty, CityCountyData } from "../data/CityCountyData"

export function getCityInfo(city: string, key: keyof CityCounty) {
	for (const data of CityCountyData) {
		if (data.cityName === city) return data[key]
	}
	throw new CustomError(400, `City ${city} is not available.`)
}
