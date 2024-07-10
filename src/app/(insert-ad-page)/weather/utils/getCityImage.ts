import errorHandler, { CustomError } from "../../../../utils/errorHandler"
import { UNSPLASH_API_BASE_URL } from "../constant"
import { CityPictureAPIResponse } from "../types"
import { getCityInfo } from "./getStationInfo"
import { blurHashToDataURL } from "@/utils/blurhashToDataURL"

export async function getCityImage(city: string): Promise<CityPictureAPIResponse> {
	let requiredData: CityPictureAPIResponse
	try {
		const englishName = getCityInfo(city, "englishName")
		const response = await fetch(`${UNSPLASH_API_BASE_URL}?query=${englishName}`, {
			headers: {
				Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
			},
			next: { revalidate: 60 * 10 },
		})
		if (!response.ok) {
			errorHandler("RANDOM_CITY_PHOTO", response.status)
		}
		const data = await response.json()
		requiredData = {
			url: data.urls.full,
			id: data.id,
			dataURL: blurHashToDataURL(data.blur_hash),
			alternativeSlugs: data.alternative_slugs,
		}
		return requiredData
	} catch (error) {
		if (error instanceof CustomError && error.statusCode === 403) {
			requiredData = {
				url: "https://picsum.photos/1280",
				id: (Math.random() * 100).toString(),
				alternativeSlugs: [],
			}

			return requiredData
		}
		throw error
	}
}
