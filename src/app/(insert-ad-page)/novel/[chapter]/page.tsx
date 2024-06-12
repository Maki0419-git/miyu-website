import pool from "../../../../libs/mysql"
import { styled } from "@pigment-css/react"
import { RowDataPacket } from "mysql2"
import { Article, VocabularyList, VocabularyProvider } from "./client"

const Container = styled("div")({
	padding: "20px 20px",
	width: "100%",
	display: "flex",
	gap: "20px",
	height: "100%",
	overflowY: "scroll",
})

const RightSection = styled("div")({
	flex: 3,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "10px",
	borderLeft: "1px solid #e2dfdf",
	height: "1000px",
})

export interface Chapter extends RowDataPacket {
	id: number
	novel_id: number
	title: string
	content: string
	image_file?: string
	image_url?: string
}

async function getChapter(chapter: string) {
	const db = await pool.getConnection()
	const query = `select * from chapter where id = ${chapter};`
	const [chapters] = await db.query<Chapter[]>(query)
	const { title, content } = chapters[0]

	return { title, content }
}

export default async function ChapterPage({ params }: { params: { chapter: string } }) {
	const chapter = params.chapter
	const { title, content } = await getChapter(chapter)
	const formattedContent = content.replace(/\n/g, "<br/>")

	return (
		<VocabularyProvider>
			<Container>
				<Article title={title} content={formattedContent} />
				<RightSection>
					<VocabularyList />
				</RightSection>
			</Container>
		</VocabularyProvider>
	)
}
