"use client"
import { styled } from "@pigment-css/react"
import { VocabularyResponseType } from "../types"
import { useRef, useState } from "react"

const Container = styled("div")({
	padding: "20px 20px",
	width: "100%",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	height: "100%",
	overflowY: "scroll",
})

const Card = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "10px",
	overflow: "hidden",
	width: "100%",
	height: "100%",
	minWidth: "150px",
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
	"> h6:last-child": {
		color: "gray",
	},
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
})

const SubTitle = styled("h6")<{ type: string }>({
	borderRadius: "2px",
	color: "white",
	padding: "3px 5px",
	width: "fit-content",
	variants: [
		{
			props: { type: "hiragana" },
			style: { backgroundColor: "#e76f51" },
		},
		{
			props: { type: "meaning" },
			style: { backgroundColor: "#90be6d" },
		},
		{
			props: { type: "example" },
			style: { backgroundColor: "#2a9d8f" },
		},
	],
})

const Dialog = styled("dialog")({
	padding: "20px",
	width: "40%",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	height: "30%",
	overflowY: "scroll",
	"::backdrop": {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
})

export function VocabularyList({ vocabularies }: { vocabularies: VocabularyResponseType[] }) {
	const [modalOpen, setModalOpen] = useState(true)
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [selectedVocabulary, setSelectedVocabulary] = useState<VocabularyResponseType | undefined>(undefined)

	return (
		<>
			<Container>
				<h2>Vocabulary List</h2>
				{vocabularies.map((vocabulary) => (
					<Card key={vocabulary.vocabulary}>
						<Title>
							<h4>{vocabulary.vocabulary}</h4>
							<Tag>
								<h6>{vocabulary.type}</h6>
							</Tag>
						</Title>
						<Section>
							<SubTitle type="hiragana">平假名</SubTitle>
							<h5>{vocabulary.hiragana}</h5>
						</Section>
						<Section>
							<SubTitle type="meaning">意思</SubTitle>
							<h5>{vocabulary.meaning}</h5>
						</Section>

						<SubTitle type="example">例句</SubTitle>
						<h6>{vocabulary.example.japanese}</h6>
						<h6>{vocabulary.example.chinese}</h6>
					</Card>
				))}
			</Container>
			<Dialog open={modalOpen} ref={dialogRef}>
				123
			</Dialog>
		</>
	)
}
