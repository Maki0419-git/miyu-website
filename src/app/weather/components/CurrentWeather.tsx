import { styled } from "@pigment-css/react";
import { getWeatherApiEndpoint } from "../utils/getWeatherApiEndpoint";
import errorHandler from "@/utils/errorHandler";
import { WeatherAPIResponse } from "../types";
import dayjs from "dayjs";
import { WEATHER_DETAIL } from "../constant";
import { getWeatherType } from "../utils/getWeatherType";
import { WEATHER_ICON } from "./WeatherIcon";
import Thermometer from "../../../assets/weather/thermometer.svg";

const Container = styled("div")({
  border: "1px solid red",
  flex: 3,
  "h1, h2,h3": {
    color: "white",
    margin: 0,
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
});

const WeatherInfo = styled("div")({
  border: "1px solid yellow",
  display: "flex",
  gap: "10px",
  margin: "20px 0",
});

const Temperature = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "1.5rem",
});

const Divider = styled("div")({
  borderLeft: "1px solid white",
  margin: "0 10px",
});

const WeatherDescription = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

async function getCurrentWeather(
  station: string
): Promise<WeatherAPIResponse<"CURRENT_WEATHER">> {
  try {
    const endpoint = getWeatherApiEndpoint("CURRENT_WEATHER");
    const response = await fetch(
      `${endpoint}?StationName=${station}&Authorization=${process.env.WEATHER_API_KEY}`,
      { cache: "no-store" }
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

type CurrentWeatherProps = {
  isDayOrNight: "day" | "night";
  station: string;
};

export default async function CurrentWeather({
  isDayOrNight,
  station,
}: CurrentWeatherProps) {
  const currentWeatherData = await getCurrentWeather(station);
  const targetStation = currentWeatherData.records.Station[0];
  const {
    ObsTime: { DateTime: dateTime },
    GeoInfo: { CountyName: countyName },
  } = targetStation;
  const time = dayjs(dateTime).format("hh:mm A");
  const { Weather: weather, AirTemperature: temperature } =
    targetStation.WeatherElement;
  const weatherIcon =
    WEATHER_ICON[isDayOrNight][getWeatherType(WEATHER_DETAIL, weather)];

  console.log({ weather });

  return (
    <Container>
      <h1>{countyName}</h1>
      <h2>{time}</h2>
      <WeatherInfo>
        <Temperature>
          <Thermometer width={100} height={100} />
          <h1>{temperature}°C</h1>
        </Temperature>
        <Divider />
        <WeatherDescription>
          {weatherIcon}
          <h2>{weather}</h2>
        </WeatherDescription>
      </WeatherInfo>
      <h3>測站：{station}</h3>
    </Container>
  );
}
