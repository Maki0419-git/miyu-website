"use client";
import { styled } from "@pigment-css/react";
import WeatherAnimation from "./WeatherAnimation";
import { Weather } from "./types";

const Container = styled("div")({
  width: "1200px",
  display: "flex",
  height: "30vh",
  flexDirection: "column",
  padding: "0 20px",
  border: "1px solid red",
  gap: "10px",
});

const CityCardContainer = styled("div")({
  display: "flex",
  height: "100%",
  justifyContent: "space-between",
  gap: "20px",
  overflowX: "auto",
  padding: "10px 0",
  border: "1px solid blue",
});

const CityCard = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  gap: "20px",
  width: "100%",
  height: "100%",
  minWidth: "150px",
  padding: "30px 20px",
  borderRadius: "8px",
  backgroundPosition: "center",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1574678863094-1cebd3031d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTIxODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTM2MjYxMTZ8&ixlib=rb-4.0.3&q=80&w=1080')",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export default function RecentPlace() {
  return (
    <Container>
      <h2>Recent Place</h2>
      <CityCardContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <CityCard key={index}>
            <h3>Paris</h3>
            <h4>25°C</h4>
            <h4>🌧️</h4>
            <WeatherAnimation weather={Weather.FOGGY} />
          </CityCard>
        ))}
      </CityCardContainer>
    </Container>
  );
}
