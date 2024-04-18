import errorHandler from "@/utils/errorHandler";
import { getWeatherApiEndpoint } from "./utils/getWeatherApiEndpoint";
import { styled } from "@pigment-css/react";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifyContent: "center",
});

async function getCurrentWeather() {
  try {
    const endpoint = getWeatherApiEndpoint("CURRENT_WEATHER");
    const response = await fetch(
      `${endpoint}?StationName=嘉義&Authorization=${process.env.WEATHER_API_KEY}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      errorHandler("CURRENT_WEATHER", response.status);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw error;
  }
}

export default async function CurrentWeather() {
  //   const currentWeatherData = await getCurrentWeather();

  //   console.log(currentWeatherData);

  return <main>This is Current Weather</main>;
}
