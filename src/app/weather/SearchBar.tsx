"use client";

import { styled } from "@pigment-css/react";
import Image from "next/image";
import useCity from "./hooks/useCity";
import { useEffect, useRef, useState } from "react";
import SuggestionList from "./SuggestionList";
import useDebounceValue from "./hooks/useDebounceValue";

const Container = styled("div")({
  // border: "1px solid red",
  height: "30vh",
  span: {
    fontWeight: "normal",
    color: "rgb(135, 135, 135)",
    margin: "10px 0",
  },
});

const SearchBarContainer = styled("form")({
  position: "relative",
  marginTop: "5px",
  minWidth: "430px",
  height: "40px",
  borderRadius: "40px",
  boxShadow: " 0 6px 8px rgba(0, 0, 0, 0.15)",
  background: "#fff",
  transition: "all 0.3s ease",
  border: "1px solid red",
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
  const [query, setQuery] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const debouncedQuery = useDebounceValue<string>(query, 1000);
  const { cities } = useCity(debouncedQuery);
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange");
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (selectedIndex === undefined || selectedIndex === cities.length - 1) {
        setSelectedIndex(0);
        setQuery(cities[0]);
        if (suggestionListRef.current) {
          suggestionListRef.current.scrollTo(0, 0);
        }
      } else {
        setSelectedIndex(selectedIndex + 1);
        setQuery(cities[selectedIndex + 1]);
        if (suggestionListRef.current) {
          console.log({ scrollTop: suggestionListRef.current.scrollTop });
          suggestionListRef.current.scrollTop += 40;
        }
      }
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (selectedIndex === undefined || selectedIndex === 0) {
        setSelectedIndex(cities.length - 1);
        setQuery(cities[cities.length - 1]);
        if (suggestionListRef.current) {
          suggestionListRef.current.scrollTo(
            0,
            suggestionListRef.current.scrollHeight
          );
        }
      } else {
        setSelectedIndex(selectedIndex - 1);
        setQuery(cities[selectedIndex - 1]);
        if (suggestionListRef.current) {
          suggestionListRef.current.scrollTop -= 40;
        }
      }
    }
    if (event.key === "Enter" && selectedIndex !== undefined) {
      event.preventDefault();
      console.log("enter");
    }
  };

  // redefined the selectedIndex when the cities array changes
  useEffect(() => {
    setSelectedIndex(undefined);
  }, [cities.length]);

  return (
    <Container>
      <h2>Where are you searching for...</h2>
      <span>Enter city name which you want to know</span>
      <SearchBarContainer>
        <Input
          type="text"
          placeholder="Search for a city"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <SearchButton type="submit">
          <Image src="/search.svg" alt="Search Icon" width={20} height={20} />
        </SearchButton>
      </SearchBarContainer>
      {cities.length !== 0 && (
        <SuggestionList
          suggestions={cities}
          selectedIndex={selectedIndex}
          ref={suggestionListRef}
        />
      )}
    </Container>
  );
}
