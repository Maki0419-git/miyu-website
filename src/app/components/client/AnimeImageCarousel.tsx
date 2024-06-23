"use client"

import { useCallback } from "react"
import { ImageCarousel, ImageData } from "./ImageCarousel"
import { AnimeWithImgAPIResponse } from "@/app/utils/anime/getRecommendAnime"
import errorHandler, { CustomError } from "@/utils/errorHandler"

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

	return <ImageCarousel data={data} options={{ unOptimized: true, lazyLoad: true, fetchMoreData }} />
}
