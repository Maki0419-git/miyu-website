import { firebaseStorage } from "@/libs/firebase"
import { neon } from "@neondatabase/serverless"
import { getDownloadURL, ref } from "firebase/storage"
import { ImageCarousel, ImageData } from "../client"

type Anime = {
	id: number
	title: string
	description: string
}

async function getRecommendAnime() {
	try {
		const sql = neon(process.env.DATABASE_URL || "")
		const recommendAnime = (await sql`select * from anime;`) as Anime[]
		const generateAnimeWithImgInfo = async (recommendAnime: Anime[]) => {
			const promises = recommendAnime.map(async (anime) => {
				const src = await getDownloadURL(ref(firebaseStorage, `anime/${anime.id}.jpeg` || ""))
				return { src, alt: anime.title, ...anime }
			})
			const urls = await Promise.all(promises)
			return urls
		}
		const animeWithImgInfo: ImageData[] = await generateAnimeWithImgInfo(recommendAnime)

		return { animeWithImgInfo }
	} catch (e) {
		throw e
	}
}

export async function RecommendAnime() {
	const { animeWithImgInfo } = await getRecommendAnime()

	return <ImageCarousel data={animeWithImgInfo} />
}
