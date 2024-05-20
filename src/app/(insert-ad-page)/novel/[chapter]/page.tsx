import pool from "../../../../libs/mysql"
import { styled } from "@pigment-css/react"
import { RowDataPacket } from "mysql2"

const Container = styled("div")({
	padding: "20px 20px",
	width: "100%",
	display: "flex",
	gap: "20px",
	height: "100%",
	overflowY: "scroll",
})

const Article = styled("article")({
	flex: 7,
	margin: "20px",
	lineHeight: "2",
	p: {
		margin: "20px 0",
	},
})

const RightSection = styled("div")({
	flex: 3,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "10px",
	border: "1px solid #000",
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
		<Container>
			<Article>
				<h1>{title}</h1>
				{/* https://blog.logrocket.com/using-dangerouslysetinnerhtml-react-application/ */}
				<div dangerouslySetInnerHTML={{ __html: `<p>${formattedContent}</p>` }} />
			</Article>
			<RightSection />
		</Container>
	)
}
