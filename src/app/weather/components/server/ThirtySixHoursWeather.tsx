import errorHandler from "@/utils/errorHandler";
import { getWeatherApiEndpoint } from "../../utils/getWeatherApiEndpoint";
import { styled } from "@pigment-css/react";
import { WeatherAPIResponse } from "../../types";
import Humidity from "../../../../assets/weather/humidity.svg";
import createWeatherCardList from "../../utils/createWeatherCardList";
import { WeatherCardTime, WeatherImage } from "../client";
import { getWeatherType } from "../../utils/getWeatherType";
import { WEATHER_CODE } from "../../constant";

const Container = styled("div")({
	flex: 7,
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-end",
	h5: {
		color: "white",
		textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
		margin: "10px 20px",
	},
});

const WeatherCardContainer = styled("div")({
	display: "flex",
	justifyContent: "flex-end",
	gap: "30px",
	padding: "0 20px",
	height: "70%",
	"@media (max-width: 1440px)": {
		height: "80%",
	},
});

const WeatherCard = styled("div")({
	position: "relative",
	padding: "30px 20px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	borderRadius: "10px",
	border: "1px solid #efecec",
	backdropFilter: "blur(5px)",
	minWidth: "250px",
	maxWidth: "300px",
	width: "30%",
	height: "100%",
	"h2,h3,h4": { fontWeight: "normal", color: "white" },
	svg: {
		width: "100px",
		height: "100px",
		margin: "10px 0 20px 0",
	},
});

const MinMaxTemperature = styled("div")({
	margin: "10px 0",
	display: "flex",
	alignItems: "center",
	gap: "5px",
	h3: {
		color: "#dbdada",
	},
});

const RainPossibility = styled("div")({
	position: "absolute",
	bottom: "0",
	left: "0",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "23%",
	gap: "5px",
	backgroundColor: "rgba(0, 0, 0, 0.3)",
	borderRadius: "0 0 10px 10px",
	svg: {
		width: "60px",
		height: "60px",
	},
});

async function getThirtySixHoursWeather(city: string): Promise<WeatherAPIResponse<"THIRTY_SIX_HOURS_WEATHER">> {
	try {
		const endpoint = getWeatherApiEndpoint("THIRTY_SIX_HOURS_WEATHER");
		const response = await fetch(`${endpoint}?locationName=${city}&Authorization=${process.env.WEATHER_API_KEY}`, {
			cache: "no-store",
		});

		if (!response.ok) {
			errorHandler("THIRTY_SIX_HOURS_WEATHER", response.status);
		}

		const data = await response.json();

		return data;
	} catch (error: any) {
		console.log({ error });
		throw error;
	}
}
type ThirtySixHoursWeatherProps = {
	city: string;
};

export async function ThirtySixHoursWeather({ city }: ThirtySixHoursWeatherProps) {
	const thirtySixHoursWeatherData = await getThirtySixHoursWeather(city);
	const weatherElement = thirtySixHoursWeatherData.records.location[0].weatherElement;
	const weatherCardList = createWeatherCardList(weatherElement);
	console.log(thirtySixHoursWeatherData);
	console.log({ weatherCardList });

	return (
		<Container>
			<WeatherCardContainer>
				{weatherCardList.map((weatherCard, index) => (
					<WeatherCard key={index}>
						<WeatherCardTime dateTime={weatherCard.startTime} />
						<WeatherImage
							city={city}
							weather={getWeatherType(WEATHER_CODE, weatherCard.weatherElement.Wx.code)}
							targetTime={weatherCard.startTime}
						/>
						<h4>{weatherCard.weatherElement.Wx.description}</h4>
						<MinMaxTemperature>
							<h3>{weatherCard.weatherElement.MinT}</h3>
							<h3>/</h3>
							<h2>{weatherCard.weatherElement.MaxT}°C</h2>
						</MinMaxTemperature>
						<RainPossibility>
							<Humidity />
							<div>
								<h2>{weatherCard.weatherElement.PoP}%</h2>
								<h4>降雨機率</h4>
							</div>
						</RainPossibility>
					</WeatherCard>
				))}
			</WeatherCardContainer>
			<h5>{thirtySixHoursWeatherData.records.datasetDescription}</h5>
		</Container>
	);
}
