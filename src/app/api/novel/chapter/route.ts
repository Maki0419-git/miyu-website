import { Chapter } from "@/app/novel/types"
import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres"

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const chapterID = searchParams.get("id") || ""
	try {
		const sql = postgres(process.env.DATABASE_URL || "")
		const chapters = await sql<Chapter[]>`select * from chapter where id = ${chapterID};`

		return NextResponse.json({ chapter: chapters[0] })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
