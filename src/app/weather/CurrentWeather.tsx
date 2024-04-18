import errorHandler from "@/utils/errorHandler";
import { WEATHER_API_ENDPOINTS } from "./constant";
import { WeatherAPI } from "./types";

async function getCurrentWeather() {
  try {
    const response = await fetch(
      `${WEATHER_API_ENDPOINTS}/${WeatherAPI.CURRENT_WEATHER}?StationName=嘉義`
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
  const currentWeatherData = await getCurrentWeather();

  console.log(currentWeatherData);

  return <main>Current Weather</main>;
}
