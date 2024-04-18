import errorHandler from "@/utils/errorHandler";
import { WEATHER_API_ENDPOINTS } from "./constant";
import { WeatherAPI } from "./types";

async function getThirtySixHoursWeather() {
  try {
    const response = await fetch(
      `${WEATHER_API_ENDPOINTS}/${WeatherAPI.THIRTY_SIX_HOURS_WEATHER}?locationName=新北市&Authorization=${process.env.WEATHER_API_KEY}`
    );

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

export default async function ThirtySixHoursWeather() {
  const thirtySixHoursWeatherData = await getThirtySixHoursWeather();

  console.log(thirtySixHoursWeatherData);

  return <main>Thirty Three Hours Weather</main>;
}
