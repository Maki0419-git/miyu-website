import { ChapterPreview, Novel } from "@/app/novel/types"
import { firebaseStorage } from "@/libs/firebase"
import { getDownloadURL, ref } from "firebase/storage"
import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres"

export async function GET(request: NextRequest) {
	try {
		const sql = postgres(process.env.DATABASE_URL || "")
		const novels = await sql<Novel[]>`select * from novel where id = 1;`
		const chapters = await sql<ChapterPreview[]>`select id,title,image_file from chapter where novel_id = 1;`
		const generateChaptersWithImgURL = async (chapters: ChapterPreview[]) => {
			const promises = chapters.map(async (chapter) => {
				const image_url = await getDownloadURL(ref(firebaseStorage, `novel/${chapter.image_file}` || ""))
				return { image_url, ...chapter }
			})
			const urls = await Promise.all(promises)
			return urls
		}
		const chaptersWithImgURL: ChapterPreview[] = await generateChaptersWithImgURL(chapters)
		return NextResponse.json({ novel: novels[0], chapters: chaptersWithImgURL })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
