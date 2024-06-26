"use client"
import { keyframes, styled } from "@pigment-css/react"
import { Vocabulary } from "../types"
import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFeather } from "@fortawesome/free-solid-svg-icons"
import { QuizDialog } from "./QuizDialog"
import { VocabularyContext } from "./VocabularyProvider"
import { Skeleton } from "./Skeleton"
const Container = styled("div")({
	padding: "20px 20px",
	width: "100%",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	height: "100%",
	overflowY: "scroll",
})

const Construction = styled("div")({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100%",
	backgroundColor: "#ffedd5",
	h4: {
		color: "#FF9F1C",
	},
})

const Card = styled("div")({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	gap: "10px",
	overflowX: "hidden",
	width: "100%",
	minWidth: "250px",
	maxWidth: "500px",
	borderRadius: "8px",
	border: "1px solid #e2dfdf",
	borderLeft: "8px solid #FFBF69",
	boxShadow: "0 0 5px rgba(0,0,0,0.3)",
	color: "black",
	padding: "10px 15px",
	"h5,h6": {
		fontWeight: "normal",
	},
})

const animate = keyframes`
	from {
		transform: translateY(100%);
	}
	to {
		transform: translateY(0);
	}`

const Mask = styled("div")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	transform: "translateY(0)",
	background: "rgba(255, 255, 255, 0.8)",
	backdropFilter: "blur(5px)",
	animation: `${animate} 1s ease-in-out`,
})

const Title = styled("div")({
	display: "flex",
	gap: "10px",
	alignItems: "center",
	borderBottom: "1px solid #e2dfdf",
	padding: "10px 0",
})

const Tag = styled("div")({
	backgroundColor: "#FFBF69",
	color: "white",
	padding: "3px 5px",
	borderRadius: "5px",
	h6: {
		fontWeight: "normal",
	},
})

const Section = styled("div")({
	display: "flex",
	gap: "10px",
	alignItems: "center",
	"h6:last-child": {
		color: "gray",
		marginTop: "5px",
	},
})

const SubTitle = styled("h6")<{ type: string }>({
	borderRadius: "2px",
	color: "white",
	padding: "3px 5px",
	width: "fit-content",
	variants: [
		{
			props: { type: "hiragana" },
			style: { backgroundColor: "#ce4257" },
		},
		{
			props: { type: "meaning" },
			style: { backgroundColor: "#720026" },
		},
		{
			props: { type: "example" },
			style: { backgroundColor: "#e36414" },
		},
	],
})

const ActionBar = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
})

const Quiz = styled("div")({
	display: "flex",
	gap: "5px",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	color: "#379188",
})

export function VocabularyList() {
	const [modalOpen, setModalOpen] = useState(false)
	const { vocabularies, isPending } = useContext(VocabularyContext)

	return (
		<>
			<Container>
				<ActionBar>
					<h2>單字列表</h2>
					<Quiz onClick={() => setModalOpen(true)}>
						<FontAwesomeIcon icon={faFeather} />
						<h5>測驗</h5>
					</Quiz>
				</ActionBar>
				{vocabularies.length === 0 && !isPending && (
					<Construction>
						<h4>選取不會的單字，增加至單字列表！</h4>
					</Construction>
				)}
				{vocabularies.map((vocabulary) => (
					<Card key={vocabulary.vocabulary}>
						{modalOpen && <Mask />}
						<Title>
							<h4>{vocabulary.vocabulary}</h4>
							<Tag>
								<h6>{vocabulary.type}</h6>
							</Tag>
						</Title>
						<CardContent vocabulary={vocabulary} />
					</Card>
				))}
				{isPending && <Skeleton />}
			</Container>

			{/* ref: https://medium.com/@dimterion/modals-with-html-dialog-element-in-javascript-and-react-fb23c885d62e */}
			{modalOpen && <QuizDialog setModalOpen={setModalOpen} vocabularyList={vocabularies} />}
		</>
	)
}

export function CardContent({ vocabulary }: { vocabulary: Vocabulary }) {
	return (
		<>
			<Section>
				<SubTitle type="hiragana">平假名</SubTitle>
				<h5>{vocabulary.hiragana}</h5>
			</Section>
			<Section>
				<SubTitle type="meaning">意思</SubTitle>
				<h5>{vocabulary.meaning}</h5>
			</Section>
			<Section style={{ alignItems: "flex-start" }}>
				<SubTitle type="example">例句</SubTitle>
				<div>
					<h6>{vocabulary.example.japanese}</h6>
					<h6>{vocabulary.example.chinese}</h6>
				</div>
			</Section>
		</>
	)
}
