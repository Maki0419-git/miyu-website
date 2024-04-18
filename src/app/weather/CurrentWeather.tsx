import errorHandler from "@/utils/errorHandler";
import { getWeatherApiEndpoint } from "./utils/getWeatherApiEndpoint";

async function getCurrentWeather() {
  try {
    const endpoint = getWeatherApiEndpoint("CURRENT_WEATHER");
    const response = await fetch(
      `${endpoint}?StationName=嘉義&Authorization=${process.env.WEATHER_API_KEY}`
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
