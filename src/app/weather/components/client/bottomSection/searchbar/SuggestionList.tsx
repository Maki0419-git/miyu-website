"use client";

import { styled } from "@pigment-css/react";
import { forwardRef } from "react";

const Container = styled("div")({
	borderRadius: "8px",
	padding: "10px",
	marginTop: "10px",

	boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
	"&:focus": {
		outline: "none",
	},
});

const List = styled("ul")({
	listStyle: "none",
	maxHeight: "200px",
	overflowY: "auto",
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

const SuggestionList = forwardRef<HTMLUListElement, SuggestionListProps>((props, ref) => {
	return (
		<Container>
			<List ref={ref}>
				{props.suggestions.map((suggestion, index) => (
					<ListItem key={suggestion} isSelected={props.selectedIndex === index}>
						{suggestion}
					</ListItem>
				))}
			</List>
		</Container>
	);
});

SuggestionList.displayName = "SuggestionList"; // Add display name

export default SuggestionList;
