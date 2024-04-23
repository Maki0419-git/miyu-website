"use client";

import { styled } from "@pigment-css/react";

const Container = styled("div")({
  border: "1px solid #f3f3f3",
  borderRadius: "8px",
  padding: "10px",
  marginTop: "10px",
  boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.15)",
  "&:focus": {
    outline: "none",
  },
});

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const ListItem = styled("li")<{ isSelected: Boolean }>({
  padding: "10px",
  borderBottom: "1px solid #f3f3f3",
  background: (props) => (props.isSelected ? "#f8f8f8" : "transparent"),
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    background: "#f8f8f8",
  },
});

type SuggestionListProps = {
  suggestions: string[];
  selectedIndex: number | undefined;
};

export default function SuggestionList({
  suggestions,
  selectedIndex,
}: SuggestionListProps) {
  return (
    <Container>
      <List>
        {suggestions.map((suggestion, index) => (
          <ListItem key={suggestion} isSelected={index === selectedIndex}>
            {suggestion}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
