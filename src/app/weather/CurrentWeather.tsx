import { styled } from "@pigment-css/react";
import Image from "next/image";

const Container = styled("div")({
  border: "1px solid red",
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

const RainPossibility = styled("div")({
  border: "1px solid red",
  "h1 , h2": {
    fontWeight: "normal",
  },
});

const RainPossibilityInner = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

export default async function CurrentWeather() {
  //   const currentWeatherData = await getCurrentWeather();

  //   console.log(currentWeatherData);

  return (
    <Container>
      <h1>San Francisco</h1>
      <h2>06:25PM</h2>
      <WeatherInfo>
        <Temperature>
          <Image
            src="https://picsum.photos/200"
            alt="Weather Icon"
            width={100}
            height={100}
            priority
          />
          <h1>25°C</h1>
        </Temperature>
        <Divider />
        <RainPossibility>
          <h2>Rain</h2>
          <RainPossibilityInner>
            <Image
              src="https://picsum.photos/200"
              alt="Rain Icon"
              width={80}
              height={80}
              priority
            />
            <h1>60%</h1>
          </RainPossibilityInner>
        </RainPossibility>
      </WeatherInfo>
    </Container>
  );
}
