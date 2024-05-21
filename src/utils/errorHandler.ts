import { UnsplashAPIAlias, WeatherApiAlias } from "@/app/(insert-ad-page)/weather/types"

type apiAlias = WeatherApiAlias | UnsplashAPIAlias

export class CustomError extends Error {
	constructor(
		public statusCode: number,
		public message: string,
	) {
		super(message)
		this.name = "CustomError"
	}
}

export default function errorHandler(apiAlias: apiAlias, status: Response["status"]) {
	switch (status) {
		case 401:
			throw new CustomError(401, `${apiAlias} Unauthorized`)
		case 403:
			throw new CustomError(403, `${apiAlias} Forbidden`)
		case 404:
			throw new CustomError(404, `${apiAlias} Not Found`)
		case 500:
			throw new CustomError(500, `${apiAlias} Internal Server Error`)
		default:
			throw new CustomError(status, `${apiAlias} Something went wrong`)
	}
}
