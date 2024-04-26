import { Suspense } from "react";
import CurrentWeather from "./components/CurrentWeather";
import ThirtySixHoursWeather from "./components/ThirtySixHoursWeather";
import { styled } from "@pigment-css/react";
import SearchBar from "./components/searchbar/SearchBar";
import RecentPlace from "./components/RecentPlace";
import { getWeatherApiEndpoint } from "./utils/getWeatherApiEndpoint";
import errorHandler from "@/utils/errorHandler";
import { WeatherAPIResponse } from "./types";
import { getIsDayOrNight } from "./utils/getIsDayOrNight";

const TopSection = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  padding: "60px 80px",
  height: "60vh",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1561105111-d592363f0472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTIxODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQwNTc1MTd8&ixlib=rb-4.0.3&q=80&w=2000')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "#252746",
});

const BottomSection = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "60px 80px",
  border: "1px solid red",
});

async function getSunriseSunsetTime(): Promise<
  WeatherAPIResponse<"SUNRISE_SUNSET_TIME">
> {
  try {
    const endpoint = getWeatherApiEndpoint("SUNRISE_SUNSET_TIME");
    const response = await fetch(
      `${endpoint}?CountyName=臺北市&Date=2024-04-26&Authorization=${process.env.WEATHER_API_KEY}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      errorHandler("SUNRISE_SUNSET_TIME", response.status);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log({ error });
    throw error;
  }
}

export default async function WeatherPage() {
  const sunriseSunsetTime = await getSunriseSunsetTime();
  const isDayOrNight = getIsDayOrNight(
    sunriseSunsetTime.records.locations.location[0].time[0]
  );
  console.log({ sunriseSunsetTime });
  console.log({ isDayOrNight });
  return (
    <>
      <TopSection>
        <Suspense fallback={<div>Loading...</div>}>
          <CurrentWeather isDayOrNight={isDayOrNight} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ThirtySixHoursWeather isDayOrNight={isDayOrNight} />
        </Suspense>
      </TopSection>
      <BottomSection>
        <SearchBar />
        <RecentPlace />
      </BottomSection>
    </>
  );
}
