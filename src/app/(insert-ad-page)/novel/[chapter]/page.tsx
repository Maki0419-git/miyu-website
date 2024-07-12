import { styled } from "@pigment-css/react"
import { Article, VocabularyList, VocabularyProvider } from "./client"
import { Chapter } from "@/app/novel/types"
import { neon } from "@neondatabase/serverless"

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
	backgroundColor: "#ffedd5",
	borderRadius: "8px",
	margin: "20px",
	height: "calc(100vh - 150px)",
})

async function getChapter(chapter: string) {
	try {
		/**
		 ref: https://stackoverflow.com/questions/76309154/next-js-typeerror-failed-to-parse-url-from-when-targeting-api-route-relati
		 **/

		const sql = neon(process.env.DATABASE_URL || "")
		const chapters = (await sql`select * from chapter where id = ${chapter};`) as Chapter[]

		return { chapter: chapters[0] }
	} catch (e) {
		throw e
	}
}

export default async function ChapterPage({ params }: { params: { chapter: string } }) {
	const chapter = params.chapter
	const {
		chapter: { title, content },
	} = await getChapter(chapter)
	const formattedContent = content.replace(/\\n/g, "<br/>")

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
