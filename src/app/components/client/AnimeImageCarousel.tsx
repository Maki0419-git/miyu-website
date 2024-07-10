"use client"

import { useCallback } from "react"
import { ImageCarousel, ImageData } from "./ImageCarousel"
import { AnimeWithImgAPIResponse } from "@/app/utils/anime/getRecommendAnime"
import errorHandler, { CustomError } from "@/utils/errorHandler"
import { styled } from "@pigment-css/react"

const BottomSection = styled("div")({
	position: "absolute",
	bottom: 0,
	left: 0,
	width: "100%",
	color: "white",
	padding: "1rem 1rem",
	overflowY: "scroll",
	background: "transparent",
	transform: "translateY(calc(100% - 4rem))",
	transition: "all 0.3s",
	"&:hover": {
		transform: "translateY(0)",
		background: "radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0, 0, 0, 0) 100%)",
	},
})

const AnimatedTitle = styled("h3")({
	textDecoration: "underline",
	textDecorationColor: "#FF9F1C",
	textDecorationThickness: "4px",
	fontSize: "1.5rem",
	transition: "transform 0.3s",
	position: "sticky",
	top: 0,
})

const AnimatedDescription = styled("p")({
	margin: "1rem 0",
	maxHeight: "10rem",
	overflowY: "scroll",
})

const Mask = styled("div")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,0.3) 80%, rgba(0, 0, 0, 0.9) 100%)",
	borderRadius: "8px",
})

export function AnimeImageCarousel({ data }: { data: ImageData[] }) {
	const fetchMoreData = useCallback(async (offset?: number, limit?: number) => {
		try {
			const res = await fetch(`/api/anime?offset=${offset}&limit=${limit}`)
			if (!res.ok) {
				errorHandler("GET_RECOMMEND_ANIME", res.status)
			}
			const { animeWithImgInfo } = (await res.json()) as AnimeWithImgAPIResponse
			return animeWithImgInfo
		} catch (e) {
			if (e instanceof CustomError) {
				throw e
			}
			throw new Error("Internal Server Error")
		}
	}, [])

	return (
		<ImageCarousel
			data={data}
			options={{ unOptimized: true, lazyLoad: true, fetchMoreData }}
			customizedCardContent={({ title, description }) => (
				<>
					<Mask />
					<BottomSection>
						<AnimatedTitle>{title}</AnimatedTitle>
						<AnimatedDescription>{description}</AnimatedDescription>
					</BottomSection>
				</>
			)}
		/>
	)
}
