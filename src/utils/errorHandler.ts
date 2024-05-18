import { UnsplashAPIAlias, WeatherApiAlias } from "@/app/(insert-ad-page)/weather/types"

type apiAlias = WeatherApiAlias | UnsplashAPIAlias

export default function errorHandler(apiAlias: apiAlias, status: Response["status"]) {
	switch (status) {
		case 401:
			throw new Error(`${apiAlias} Unauthorized`)
		case 403:
			throw new Error(`${apiAlias} Forbidden`)
		case 404:
			throw new Error(`${apiAlias} Not Found`)
		case 500:
			throw new Error(`${apiAlias} Internal Server Error`)
		default:
			throw new Error(`${apiAlias} Something went wrong`)
	}
}
