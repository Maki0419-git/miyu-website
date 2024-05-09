import { WeatherApiAlias } from "@/app/weather/types"

type apiAlias = WeatherApiAlias

export default function errorHandler(apiAlias: apiAlias, status: Response["status"]) {
	switch (status) {
		case 401:
			throw new Error(`${apiAlias} Unauthorized`)
		case 404:
			throw new Error(`${apiAlias} Not Found`)
		case 500:
			throw new Error(`${apiAlias} Internal Server Error`)
		default:
			throw new Error(`${apiAlias} Something went wrong`)
	}
}
