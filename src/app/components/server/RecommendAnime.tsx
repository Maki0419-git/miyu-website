import { getRecommendAnime } from "@/app/utils/anime/getRecommendAnime"
import { AnimeImageCarousel } from "../client/AnimeImageCarousel"

export async function RecommendAnime() {
	const { animeWithImgInfo } = await getRecommendAnime()

	return <AnimeImageCarousel data={animeWithImgInfo} />
}
