"use client";
import { keyframes, styled } from "@pigment-css/react";
import { Weather } from "./types";

const rainy = keyframes({
  "0%": {
    backgroundPosition: "0% 0%",
  },
  "100%": {
    backgroundPosition: "10% -110%",
  },
});

const cloudy = keyframes({
  "0%": {
    backgroundPosition: "100px 100px",
  },
  "100%": {
    backgroundPosition: "-1500px 0",
  },
});

const lightning = keyframes({
  "0%": {
    opacity: 0,
  },
  "20%": {
    opacity: 0,
  },
  "21%": {
    opacity: 1,
  },
  "22%": {
    opacity: 0,
  },
  "25%": {
    opacity: 0,
  },
  "31%": {
    opacity: 1,
  },
  "35%": {
    opacity: 0,
  },
  "100%": {
    opacity: 0,
  },
});

const snowing = keyframes({
  "0%": {
    backgroundPosition: "0% -50%",
  },
  "100%": {
    backgroundPosition: "100% 150%",
  },
});

const foggyRight = keyframes({
  "0%": {
    backgroundPosition: "0% 0%",
  },
  "20%": {
    backgroundPosition: "25% 0%",
  },
  "40%": {
    backgroundPosition: "50% 0%",
  },
  "60%": {
    backgroundPosition: "25% 0%",
  },
  "100%": {
    backgroundPosition: "0% 0%",
  },
});

const foggyLeft = keyframes({
  "0%": {
    backgroundPosition: "100% 100%",
  },
  "20%": {
    backgroundPosition: "75% 100%",
  },
  "40%": {
    backgroundPosition: "50% 100%",
  },
  "60%": {
    backgroundPosition: "75% 100%",
  },
  "100%": {
    backgroundPosition: "100% 100%",
  },
});

const RainyAnimation = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundImage: "url(https://i.postimg.cc/XvR6CjbY/rain.png)",
  animation: `${rainy} 0.5s linear infinite`,
});

const CloudyAnimation = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  opacity: "0.5",
});

const Cloud = styled("div")({
  backgroundRepeat: "repeat-x",
  height: "100%",
  backgroundImage: "url(https://s.cdpn.io/15514/clouds_2.png)",
  animation: `${cloudy} 20s infinite linear`,
});

const ThunderAnimation = styled("div")({
  position: "relative",
  right: "10px",
  height: "100%",
  width: "100%",
  transform: "rotate(190deg)",
  backgroundImage: "url(https://i.postimg.cc/xCLDGwfy/lightining.png)",
  animation: `${lightning} 4s infinite linear`,
});

const SnowyAnimation = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundImage: "url(/snow.png)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat-x",
  animation: `${snowing} 2.5s linear infinite`,
});

const FoggyAnimation = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "2",
  background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
  // backgroundImage: "url(/foggy.png)",
  // backgroundSize: "100%",
  // backgroundRepeat: "repeat-x",
  // animation: `${snowing} 2.5s linear infinite`,
});

const Fog1 = styled("div")({
  border: "1px solid red",
  height: "50%",
  backgroundImage: "url(/fog.png)",
  //   backgroundRepeat: "round",
  rotate: "180deg",
  backgroundSize: "cover",
  animation: `${foggyRight} 10s  linear infinite`,
});

const Fog2 = styled("div")({
  border: "1px solid red",
  height: "50%",
  backgroundImage: "url(/fog.png)",
  backgroundSize: "cover",
  animation: `${foggyLeft} 10s infinite linear`,
});

export default function WeatherAnimation({ weather }: { weather: Weather }) {
  switch (weather) {
    case Weather.RAINY:
      return <RainyAnimation />;
    case Weather.CLOUDY:
      return (
        <CloudyAnimation>
          <Cloud />
        </CloudyAnimation>
      );
    case Weather.THUNDER:
      return (
        <RainyAnimation>
          <ThunderAnimation />
        </RainyAnimation>
      );
    case Weather.SNOWY:
      return <SnowyAnimation />;
    case Weather.FOGGY:
      return (
        <FoggyAnimation>
          <Fog1 />
          <Fog2 />
        </FoggyAnimation>
      );
    default:
      return <RainyAnimation />;
  }
}
