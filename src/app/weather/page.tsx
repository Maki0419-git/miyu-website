import { Suspense } from "react";
import CurrentWeather from "./CurrentWeather";
import ThirtySixHoursWeather from "./ThirtySixHoursWeather";
import { styled } from "@pigment-css/react";
import SearchBar from "./SearchBar";

const TopSection = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  padding: "60px 80px",
  height: "60vh",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1609147110653-4b8bc700ed30?ixid=M3w1OTIxODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTM1MTM5OTV8&ixlib=rb-4.0.3')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "#252746",
});

const BottomSection = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  padding: "60px 80px",
  //   height: "40vh",
  //   backgroundColor: "#252746",
  border: "1px solid red",
});

export default function WeatherPage() {
  return (
    <>
      <TopSection>
        <Suspense fallback={<div>Loading...</div>}>
          <CurrentWeather />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ThirtySixHoursWeather />
        </Suspense>
      </TopSection>
      <BottomSection>
        <SearchBar />
      </BottomSection>
    </>
  );
}
