import { styled } from "@pigment-css/react"
import { Article, VocabularyList, VocabularyProvider } from "./client"
import { ChapterAPIResponse } from "@/app/novel/types"

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

async function getChapter(chapter: string) {
	try {
		/**
		 ref: https://stackoverflow.com/questions/76309154/next-js-typeerror-failed-to-parse-url-from-when-targeting-api-route-relati
		 **/
		const endpoint = process.env.URL || "http://localhost:3000"
		const res = await fetch(`${endpoint}/api/novel/chapter?id=${chapter}`)
		const data: ChapterAPIResponse = await res.json()
		return data
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
