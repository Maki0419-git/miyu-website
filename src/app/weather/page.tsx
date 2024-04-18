import { Suspense } from "react";
import CurrentWeather from "./CurrentWeather";
import ThirtySixHoursWeather from "./ThirtySixHoursWeather";
import { styled } from "@pigment-css/react";

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  height: "60vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1563896295724-808e9e229d63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTIxODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTM0NTAxNDd8&ixlib=rb-4.0.3&q=80&w=1080')",
  backgroundSize: "cover",
  backgroundPosition: "center",
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
