"use client";

import { styled } from "@pigment-css/react";
import Image from "next/image";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
  h4: {
    fontWeight: "normal",
    color: "rgb(135, 135, 135)",
  },
});

const SearchBarContainer = styled("form")({
  position: "relative",
  marginTop: "15px",
  width: "350px",
  height: "40px",
  borderRadius: "40px",
  boxShadow: " 0 6px 8px rgba(0, 0, 0, 0.15)",
  background: "#fff",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.3)",
  },
});

const Input = styled("input")({
  position: "absolute",
  left: "30px",
  width: "calc(100% - 30px)",
  height: "100%",
  borderRadius: "40px",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "14px",
});

const SearchButton = styled("button")({
  position: "absolute",
  top: "5px",
  right: "10px",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  border: "none",
  outline: "none",
  background: "#f3f3f3",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "#f8f8f8",
  },
  "&:focus": {
    background: "#f8f8f8",
  },
});

export default function SearchBar() {
  return (
    <Container>
      <h2>Where are you searching for...</h2>
      <h4>Enter city name which you want to know</h4>
      <SearchBarContainer>
        <Input type="text" placeholder="Search for a city" />
        <SearchButton type="submit">
          <Image src="/search.svg" alt="Search Icon" width={20} height={20} />
        </SearchButton>
      </SearchBarContainer>
    </Container>
  );
}
