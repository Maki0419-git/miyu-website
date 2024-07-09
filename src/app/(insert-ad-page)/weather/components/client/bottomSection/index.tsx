"use client"

import { styled } from "@pigment-css/react"
import SearchBar from "./searchbar"
import useRecentPlace from "../../../hooks/useRecentPlace"
import RecentPlace from "./RecentPlace"

const Container = styled("div")({
	display: "flex",
	width: "100%",
	justifyContent: "space-between",
	alignItems: "flex-start",
	padding: "60px 80px",
	"@media (max-width: 1440px)": {
		padding: "30px 40px",
	},
})

export function BottomSection() {
	const { recentPlace, handlePlaceChange } = useRecentPlace()

	return (
		<Container>
			<SearchBar handlePlaceChange={handlePlaceChange} />
			{recentPlace.length > 0 && <RecentPlace recentPlace={recentPlace} />}
		</Container>
	)
}
