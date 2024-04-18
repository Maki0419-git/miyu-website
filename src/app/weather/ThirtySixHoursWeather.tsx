import errorHandler from "@/utils/errorHandler";
import { getWeatherApiEndpoint } from "./utils/getWeatherApiEndpoint";

async function getThirtySixHoursWeather() {
  try {
    const endpoint = getWeatherApiEndpoint("THIRTY_SIX_HOURS_WEATHER");
    const response = await fetch(
      `${endpoint}?locationName=新北市&Authorization=${process.env.WEATHER_API_KEY}`,
      { cache: "no-store" }
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
  // const thirtySixHoursWeatherData = await getThirtySixHoursWeather();

  // console.log(thirtySixHoursWeatherData);

  return <main>This is Thirty Three Hours Weather</main>;
}
