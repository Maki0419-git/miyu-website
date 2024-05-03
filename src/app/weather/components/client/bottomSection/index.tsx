"use client";

import { styled } from "@pigment-css/react";
import SearchBar from "./searchbar";
import RecentPlace from "./RecentPlace";
import useRecentPlace from "../../../hooks/useRecentPlace";

const Container = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "60px 80px",
  border: "1px solid red",
});

export function BottomSection() {
  const { recentPlace, handlePlaceChange } = useRecentPlace();
  console.log({ recentPlace });

  return (
    <Container>
      <SearchBar handlePlaceChange={handlePlaceChange} />
      {recentPlace.length > 0 && <RecentPlace recentPlace={recentPlace} />}
    </Container>
  );
}
