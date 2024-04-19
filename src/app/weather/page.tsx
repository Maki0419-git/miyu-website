import { Suspense } from "react";
import CurrentWeather from "./CurrentWeather";
import ThirtySixHoursWeather from "./ThirtySixHoursWeather";
import { styled } from "@pigment-css/react";

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "60px 80px",
  height: "60vh",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1503818454-2a008dc38d43?ixid=M3w1OTIxODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTM1MDg1MjB8&ixlib=rb-4.0.3')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "#252746",
});

export default function WeatherPage() {
  return (
    <>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <CurrentWeather />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ThirtySixHoursWeather />
        </Suspense>
      </Container>
    </>
  );
}
