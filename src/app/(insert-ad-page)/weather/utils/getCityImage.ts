import errorHandler from "@/utils/errorHandler"
import { UNSPLASH_API_BASE_URL } from "../constant"
import { CityPictureAPIResponse } from "../types"
import { getCityInfo } from "./getStationInfo"
import { blurHashToDataURL } from "@/utils/blurhashToDataURL"

export async function getCityImage(city: string): Promise<CityPictureAPIResponse> {
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
			url: data.urls.full,
			id: data.id,
			dataURL: blurHashToDataURL(data.blur_hash),
			alternativeSlugs: data.alternative_slugs,
		}
		return requiredData
	} catch (error) {
		throw error
	}
}
