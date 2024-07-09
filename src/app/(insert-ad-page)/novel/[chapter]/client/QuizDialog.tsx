"use client"

import { styled } from "@pigment-css/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Vocabulary } from "../types"
import { CardContent } from "./VocabularyList"

const Dialog = styled("dialog")({
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	minWidth: "25%",
	minHeight: "30%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-around",
	overflowY: "scroll",
	outline: "none",
	border: "1px solid #d8d7d6",
})

const Content = styled("div")({
	flex: 8,
	padding: "30px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: 10,
	width: "100%",
	overflowY: "scroll",
	transition: "transform 1s ease-out",
	"&.shifted": {
		transform: "translateY(-1%)",
	},
})

const Divider = styled("div")({
	width: "40%",
	height: "1px",
	backgroundColor: "#d8d7d6",
})

const AnswerContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: 10,
	alignItems: "flex-start",
	opacity: 0,
	maxHeight: 0,
	transition: "max-height 1s ease-out",
	"&.visible": {
		maxHeight: "500px",
		opacity: 1,
	},
	h5: {
		fontSize: "1.1rem",
		fontWeight: "normal",
	},
	h6: {
		fontSize: "1rem",
		fontWeight: "normal",
	},
})

const ActionBar = styled("div")({
	display: "flex",
	flex: 2,
	alignItems: "flex-end",
	justifyContent: "space-around",
	width: "100%",
	height: "100%",
})

const Action = styled("button")<{ reaction: "known" | "unknown" | "giveUp" }>({
	width: "100%",
	outline: "none",
	border: "none",
	padding: "15px 20px",
	color: "#FFF",
	cursor: "pointer",
	transition: "all 0.3s",
	"&:hover": {
		backgroundColor: "#FF9F1C",
		color: "#FFF",
	},

	variants: [
		{
			props: { reaction: "known" },
			style: {
				backgroundColor: "#FF9F1C",
				"&:hover": {
					backgroundColor: "#fbae49",
				},
			},
		},
		{
			props: { reaction: "unknown" },
			style: {
				backgroundColor: "#2EC4B6",
				"&:hover": {
					backgroundColor: "#54d5cc",
				},
			},
		},
		{
			props: { reaction: "giveUp" },
			style: {
				backgroundColor: "#264653",
				"&:hover": {
					backgroundColor: "#3b6a7c",
				},
			},
		},
	],
})

type Props = {
	setModalOpen: (open: boolean) => void
	vocabularyList: Vocabulary[]
}

export function QuizDialog({ setModalOpen, vocabularyList }: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [vocabularyQueue, setVocabularyQueue] = useState<Vocabulary[]>([...vocabularyList])
	const [displayedVocabulary, setDisplayedVocabulary] = useState<Vocabulary>(() => {
		const randomIndex = Math.floor(Math.random() * vocabularyQueue.length)
		let vocabulary = vocabularyQueue[randomIndex]
		return vocabulary
	})
	const [showAnswer, setShowAnswer] = useState(false)
	const hasShownAnswer = useRef(false)

	const handleNextVocabulary = useCallback(() => {
		setShowAnswer(false)

		const updatedQueue = vocabularyQueue.filter(
			(vocabulary) => vocabulary.vocabulary !== displayedVocabulary.vocabulary,
		)
		if (updatedQueue.length === 0) {
			setModalOpen(false)
			return
		}

		const randomIndex = Math.floor(Math.random() * updatedQueue.length)
		if (!hasShownAnswer.current) setVocabularyQueue(updatedQueue)
		hasShownAnswer.current = false
		setDisplayedVocabulary(updatedQueue[randomIndex])
	}, [vocabularyQueue, displayedVocabulary, setDisplayedVocabulary, setModalOpen])

	const handleShowAnswer = () => {
		setShowAnswer(!showAnswer)
		hasShownAnswer.current = true
	}

	useEffect(() => {
		dialogRef.current?.showModal()
	}, [])

	return (
		<Dialog ref={dialogRef}>
			<Content className={showAnswer ? "shifted" : ""}>
				<h1>{displayedVocabulary?.vocabulary}</h1>

				<Divider />
				<AnswerContainer className={showAnswer ? "visible" : ""}>
					<CardContent vocabulary={displayedVocabulary} />
				</AnswerContainer>
			</Content>
			<ActionBar>
				<Action reaction="giveUp" onClick={() => setModalOpen(false)}>
					放棄
				</Action>
				<Action reaction="unknown" onClick={handleShowAnswer}>
					{showAnswer ? "關閉答案" : "忘記了..."}
				</Action>
				<Action reaction="known" onClick={handleNextVocabulary}>
					下一題！
				</Action>
			</ActionBar>
		</Dialog>
	)
}
