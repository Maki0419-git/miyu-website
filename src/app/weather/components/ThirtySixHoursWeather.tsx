import errorHandler from "@/utils/errorHandler";
import { getWeatherApiEndpoint } from "../utils/getWeatherApiEndpoint";
import { styled } from "@pigment-css/react";
import Image from "next/image";

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

const Container = styled("div")({
  flex: 7,
  display: "flex",
  justifyContent: "flex-end",
  gap: "30px",
  padding: "0 20px",
  border: "1px solid red",
});

const WeatherCard = styled("div")({
  position: "relative",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid yellow",
  borderRadius: "10px",
  backdropFilter: "blur(5px)",
  minWidth: "200px",
  width: "30%",
  height: "60%",
  h3: { fontWeight: "normal", color: "white" },
  img: {
    margin: "10px 0 20px 0",
  },
});

const MinMaxTemperature = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Temperature = styled("div")({
  position: "absolute",
  bottom: "0",
  left: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "25%",
  gap: "5px",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  borderRadius: "0 0 10px 10px",
});

export default async function ThirtySixHoursWeather() {
  // const thirtySixHoursWeatherData = await getThirtySixHoursWeather();

  // console.log(thirtySixHoursWeatherData);

  return (
    <Container>
      {Array.from({ length: 3 }).map((_, index) => (
        <WeatherCard key={index}>
          <h3>Now</h3>
          <Image
            src="https://picsum.photos/200"
            alt="weather icon"
            width={90}
            height={90}
          />
          <MinMaxTemperature>
            <h3>25°C</h3>
            <h3>20°C</h3>
          </MinMaxTemperature>
          <Temperature>
            <h3>Feel Temperature</h3>
            <h3>22°C</h3>
          </Temperature>
        </WeatherCard>
      ))}
    </Container>
  );
}
