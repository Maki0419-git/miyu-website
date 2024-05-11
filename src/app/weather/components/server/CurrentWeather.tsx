import { styled } from "@pigment-css/react"
import { WEATHER_DETAIL } from "../../constant"
import { getWeatherType } from "../../utils/getWeatherType"
import Thermometer from "../../../../assets/weather/thermometer.svg"
import { CurrentWeatherTime, WeatherImage } from "../client"
import { WeatherAPIResponse } from "../../types"
import { getCityInfo } from "../../utils/getStationInfo"
import { getWeatherApiEndpoint } from "../../utils/getWeatherApiEndpoint"
import errorHandler from "@/utils/errorHandler"

const Container = styled("div")({
	flex: 3,
	zIndex: 1,
	"h1, h2,h3": {
		color: "white",
		margin: 0,
		textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
	},
})

const WeatherInfo = styled("div")({
	display: "flex",
	gap: "10px",
	margin: "20px 0",
})

const Temperature = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "10px",
	fontSize: "1.5rem",
})

const Divider = styled("div")({
	borderLeft: "1px solid white",
	margin: "0 10px",
})

const WeatherDescription = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "10px",
})

type CurrentWeatherProps = {
	city: string
}

export async function getCurrentWeather(cityName: string[]): Promise<WeatherAPIResponse<"CURRENT_WEATHER">> {
	try {
		const availableStations = cityName.map((city) => getCityInfo(city, "stationName"))
		const endpoint = getWeatherApiEndpoint("CURRENT_WEATHER")
		const response = await fetch(
			`${endpoint}?StationName=${availableStations.join(",")}&Authorization=${process.env.WEATHER_API_KEY}`,
			{ cache: "no-store" },
		)

		if (!response.ok) {
			errorHandler("CURRENT_WEATHER", response.status)
		}

		const data = await response.json()

		return data
	} catch (error: any) {
		throw error
	}
}

export async function CurrentWeather({ city }: CurrentWeatherProps) {
	const currentWeatherData = await getCurrentWeather([city])
	const targetStation = currentWeatherData.records.Station[0]
	const {
		ObsTime: { DateTime: dateTime },
		GeoInfo: { CountyName: countyName },
		StationName: station,
	} = targetStation
	const { Weather: weather, AirTemperature: temperature } = targetStation.WeatherElement

	return (
		<Container>
			<h1>{countyName}</h1>
			<CurrentWeatherTime dateTime={dateTime} />
			<WeatherInfo>
				<Temperature>
					<Thermometer width={100} height={100} />
					<h1>{temperature}°C</h1>
				</Temperature>
				<Divider />
				<WeatherDescription>
					<WeatherImage city={city} weather={getWeatherType(WEATHER_DETAIL, weather)} targetTime={dateTime} />
					<h2>{weather}</h2>
				</WeatherDescription>
			</WeatherInfo>
			<h3>測站：{station}</h3>
		</Container>
	)
}
