import errorHandler from "@/utils/errorHandler";
import { WEATHER_API_ENDPOINTS } from "./constant";

async function getCurrentWeather() {
  try {
    const response = await fetch(
      `${WEATHER_API_ENDPOINTS}/O-A0003-001?StationName=嘉義&Authorization=${process.env.WEATHER_API_KEY}`
    );

    if (!response.ok) {
      errorHandler(response.status);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch current weather data");
  }
}

export default async function CurrentWeather() {
  const currentWeatherData = await getCurrentWeather();

  console.log(currentWeatherData);

  return <main>Current Weather</main>;
}
