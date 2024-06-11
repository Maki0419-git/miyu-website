import pool from "../../../../libs/mysql"
import { styled } from "@pigment-css/react"
import { RowDataPacket } from "mysql2"
import { Article, VocabularyList } from "./client"
import { Vocabulary } from "./types"

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
	const vocabularyJson = {
		部屋: {
			hiragana: "へや",
			type: "名詞",
			meaning: "房間",
			example: {
				japanese: "私の部屋はとても広いです。",
				chinese: "我的房間非常寬敞。",
			},
		},
		本: {
			hiragana: "ほん",
			type: "名詞",
			meaning: "書",
			example: {
				japanese: "私は本を読むのが好きです。",
				chinese: "我喜歡讀書。",
			},
		},
		読む: {
			hiragana: "よむ",
			type: "動詞",
			meaning: "閱讀",
			example: {
				japanese: "私は本を読むのが好きです。",
				chinese: "我喜歡讀書。",
			},
		},
	}

	const vocabularyList = Object.entries(vocabularyJson).reduce((acc, [key, value]) => {
		acc.push({
			vocabulary: key,
			...value,
		})

		return acc
	}, [] as Vocabulary[])

	return (
		<Container>
			<Article title={title} content={formattedContent} />
			<RightSection>
				<VocabularyList vocabularyList={vocabularyList} />
			</RightSection>
		</Container>
	)
}
