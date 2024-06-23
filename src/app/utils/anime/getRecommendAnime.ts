import { ImageData } from "@/app/components/client"
import { firebaseStorage } from "@/libs/firebase"
import { neon } from "@neondatabase/serverless"
import { getDownloadURL, ref } from "firebase/storage"

export type Anime = {
	id: number
	title: string
	description: string
}

export type AnimeWithImgAPIResponse = {
	animeWithImgInfo: ImageData[]
}

export enum AnimeAPI {
	GET_RECOMMEND_ANIME,
}

export type AnimeAPIAlias = keyof typeof AnimeAPI

export async function getRecommendAnime(offset = 0, limit = 5): Promise<AnimeWithImgAPIResponse> {
	try {
		const sql = neon(process.env.DATABASE_URL || "")
		const recommendAnime = (await sql`select * from anime limit ${limit} offset ${offset};`) as Anime[]
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
