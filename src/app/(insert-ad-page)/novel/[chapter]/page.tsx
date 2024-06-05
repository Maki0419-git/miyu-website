import pool from "../../../../libs/mysql"
import { styled } from "@pigment-css/react"
import { RowDataPacket } from "mysql2"
import { Article, VocabularyList } from "./client"

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

	return (
		<Container>
			<Article title={title} content={formattedContent} />
			<RightSection>
				<VocabularyList
					vocabularies={[
						{
							vocabulary: "輝いている",
							hiragana: "かがやいている",
							type: "動詞",
							meaning: "閃耀、發光、顯示出活力或才能",
							example: {
								japanese: "星が輝いている。",
								chinese: "星星在閃耀。",
							},
						},
						{
							vocabulary: "さくらんぼ",
							hiragana: "さくらんぼ",
							type: "名詞",
							meaning: "櫻桃",
							example: {
								japanese: "さくらんぼが美味しいです。",
								chinese: "櫻桃很好吃。",
							},
						},
						{
							vocabulary: "おはようございます",
							hiragana: "おはようございます",
							type: "挨拶",
							meaning: "早上好",
							example: {
								japanese: "おはようございます！",
								chinese: "早上好！",
							},
						},
						{
							vocabulary: "ありがとう",
							hiragana: "ありがとう",
							type: "感謝",
							meaning: "謝謝",
							example: {
								japanese: "ありがとう！",
								chinese: "謝謝！",
							},
						},
						{
							vocabulary: "おやすみなさい",
							hiragana: "おやすみなさい",
							type: "挨拶",
							meaning: "晚安",
							example: {
								japanese: "おやすみなさい！",
								chinese: "晚安！",
							},
						},
						{
							vocabulary: "すみません",
							hiragana: "すみません",
							type: "謝罪",
							meaning: "對不起",
							example: {
								japanese: "すみません！",
								chinese: "對不起！",
							},
						},
					]}
				/>
			</RightSection>
		</Container>
	)
}
