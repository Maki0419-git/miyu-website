import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { WeatherAPIResponse, WeatherType } from "../../types";
import { WEATHER_ICON } from "../server/WeatherIcon";
import { getIsDayOrNight } from "../../utils/getIsDayOrNight";
import { getWeatherApiEndpoint } from "../../utils/getWeatherApiEndpoint";
import errorHandler from "@/utils/errorHandler";

dayjs.extend(timezone);

async function getSunriseSunsetTime(city: string, date: string): Promise<WeatherAPIResponse<"SUNRISE_SUNSET_TIME">> {
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

export async function WeatherImage({
	weather,
	city,
	targetTime,
}: {
	weather: WeatherType;
	city: string;
	targetTime: string;
}) {
	const dayRemoveUTCOffset = targetTime.replace(/\+\d{2}:\d{2}$/, "");
	const day = dayjs.tz(dayRemoveUTCOffset, "Asia/Taipei");
	const date = day.format("YYYY-MM-DD");
	const data = await getSunriseSunsetTime(city, date);
	const sunriseSunsetTime = data.records.locations.location[0].time[0];
	const isDayOrNight = getIsDayOrNight(dayjs(targetTime), sunriseSunsetTime);
	const weatherIcon = WEATHER_ICON[isDayOrNight][weather];

	return weatherIcon;
}
