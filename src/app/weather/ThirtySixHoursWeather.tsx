import errorHandler from "@/utils/errorHandler";
import { WEATHER_API_ENDPOINTS } from "./constant";

async function getThirtySixHoursWeather() {
  try {
    const response = await fetch(
      `${WEATHER_API_ENDPOINTS}/F-C0032-001?locationName=新北市&Authorization=${process.env.WEATHER_API_KEY}`
    );

    if (!response.ok) {
      errorHandler(response.status);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch 36 hours weather data");
  }
}

export default async function ThirtySixHoursWeather() {
  const thirtySixHoursWeatherData = await getThirtySixHoursWeather();

  console.log(thirtySixHoursWeatherData);

  return <main>Thirty Three Hours Weather</main>;
}
