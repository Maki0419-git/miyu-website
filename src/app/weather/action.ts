"use server";

import errorHandler from "@/utils/errorHandler";
import { WeatherAPIResponse } from "./types";
import { getWeatherApiEndpoint } from "./utils/getWeatherApiEndpoint";
import { getStationInfo } from "./utils/getStationInfo";

export async function getCurrentWeather(cityName: string[]): Promise<WeatherAPIResponse<"CURRENT_WEATHER">> {
	try {
		const availableStations = cityName.map((city) => getStationInfo(city));
		const endpoint = getWeatherApiEndpoint("CURRENT_WEATHER");
		const response = await fetch(
			`${endpoint}?StationName=${availableStations.join(",")}&Authorization=${process.env.WEATHER_API_KEY}`,
			{ cache: "no-store" },
		);

		if (!response.ok) {
			errorHandler("CURRENT_WEATHER", response.status);
		}

		const data = await response.json();

		return data;
	} catch (error: any) {
		console.log({ error });
		throw error;
	}
}

export async function getSunriseSunsetTime(
	city: string,
	date: string,
): Promise<WeatherAPIResponse<"SUNRISE_SUNSET_TIME">> {
	try {
		const endpoint = getWeatherApiEndpoint("SUNRISE_SUNSET_TIME");
		const response = await fetch(
			`${endpoint}?CountyName=${city}&Date=${date}&Authorization=${process.env.WEATHER_API_KEY}`,
		);
		if (!response.ok) {
			errorHandler("SUNRISE_SUNSET_TIME", response.status);
		}

		const data = await response.json();
		return data;
	} catch (error: any) {
		console.log({ error });
		throw error;
	}
}
