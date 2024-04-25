import { styled } from "@pigment-css/react";
import Image from "next/image";
import { getWeatherApiEndpoint } from "../utils/getWeatherApiEndpoint";
import errorHandler from "@/utils/errorHandler";
import { CurrentWeatherResponse } from "../types";
import dayjs from "dayjs";
import { WEATHER_DETAIL } from "../constant";
import { getWeatherType } from "../utils/getWeatherType";
import { WEATHER_ICON } from "./WeatherIcon";

const Container = styled("div")({
  border: "1px solid red",
  flex: 3,
  "h1, h2": {
    color: "white",
    margin: 0,
  },
  "> h1,h2": {
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

async function getCurrentWeather(): Promise<CurrentWeatherResponse> {
  try {
    const endpoint = getWeatherApiEndpoint("CURRENT_WEATHER");
    const response = await fetch(
      `${endpoint}?StationName=臺北&Authorization=${process.env.WEATHER_API_KEY}`,
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

export default async function CurrentWeather() {
  console.log("CurrentWeather");
  const currentWeatherData = await getCurrentWeather();
  const targetStation = currentWeatherData.records.Station[0];
  const {
    ObsTime: { DateTime: dateTime },
    GeoInfo: { CountyName: countyName },
  } = targetStation;
  const time = dayjs(dateTime).format("hh:mm A");
  const { Weather: weather, AirTemperature: temperature } =
    targetStation.WeatherElement;
  const weatherIconSrc =
    WEATHER_ICON.day[getWeatherType(WEATHER_DETAIL, weather)];

  console.log({ weather });

  return (
    <Container>
      <h1>{countyName}</h1>
      <h2>{time}</h2>
      <WeatherInfo>
        <Temperature>
          <Image
            src="https://picsum.photos/200"
            alt="Weather Icon"
            width={100}
            height={100}
            priority
          />
          <h1>{temperature}°C</h1>
        </Temperature>
        <Divider />
        <WeatherDescription>
          {weatherIconSrc}
          <h2>{weather}</h2>
        </WeatherDescription>
      </WeatherInfo>
    </Container>
  );
}
