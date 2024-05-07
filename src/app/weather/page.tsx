import { Suspense } from "react";
import { styled } from "@pigment-css/react";
import { getWeatherApiEndpoint } from "./utils/getWeatherApiEndpoint";
import errorHandler from "@/utils/errorHandler";
import { WeatherAPIResponse } from "./types";
import { getIsDayOrNight } from "./utils/getIsDayOrNight";
import { BottomSection } from "./components/client";
import { CurrentWeather, ThirtySixHoursWeather } from "./components/server";
import dayjs from "./utils/dayjs";
const TopSection = styled("div")({
	display: "flex",
	width: "100%",
	justifyContent: "space-between",
	padding: "60px 80px",
	height: "60vh",
	backgroundImage:
		"linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1561105111-d592363f0472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTIxODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQwNTc1MTd8&ixlib=rb-4.0.3&q=80&w=2000')",
	backgroundSize: "cover",
	backgroundPosition: "center",
	backgroundColor: "#252746",
	"@media (max-width: 1440px)": {
		// flexDirection: "column",
		// height: "70vh",
		gap: "20px",
		padding: "30px 40px",
	},
});

async function getSunriseSunsetTime(cityName: string): Promise<WeatherAPIResponse<"SUNRISE_SUNSET_TIME">> {
	try {
		const date = dayjs().format("YYYY-MM-DD");
		const endpoint = getWeatherApiEndpoint("SUNRISE_SUNSET_TIME");
		const response = await fetch(
			`${endpoint}?CountyName=${cityName}&Date=${date}&Authorization=${process.env.WEATHER_API_KEY}`,
			{ cache: "no-store" },
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

export default async function WeatherPage({
	searchParams: { city = "臺北市" },
}: {
	searchParams: { [key: string]: string };
}) {
	console.log({ city });
	const sunriseSunsetTime = await getSunriseSunsetTime(city);
	const isDayOrNight = getIsDayOrNight(sunriseSunsetTime.records.locations.location[0].time[0]);
	console.log({ sunriseSunsetTime });
	console.log({ isDayOrNight });
	return (
		<>
			<TopSection>
				<Suspense fallback={<div>Loading...</div>}>
					<CurrentWeather isDayOrNight={isDayOrNight} city={city} />
				</Suspense>
				<Suspense fallback={<div>Loading...</div>}>
					<ThirtySixHoursWeather isDayOrNight={isDayOrNight} city={city} />
				</Suspense>
			</TopSection>
			<BottomSection />
		</>
	);
}
