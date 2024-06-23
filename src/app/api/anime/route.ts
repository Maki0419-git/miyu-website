import { getRecommendAnime } from "@/app/utils/anime/getRecommendAnime"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams
		const offset = Number(searchParams.get("offset")) || undefined
		const limit = Number(searchParams.get("limit")) || undefined
		const { animeWithImgInfo } = await getRecommendAnime(offset, limit)

		return NextResponse.json({ animeWithImgInfo })
	} catch (e) {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
	}
}
