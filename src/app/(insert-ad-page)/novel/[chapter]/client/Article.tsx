"use client"

import { styled } from "@pigment-css/react"
import { useRef } from "react"
import { ToolBar } from "./ToolBar"

const Container = styled("article")({
	flex: 7,
	margin: "20px",
	lineHeight: "2",
	border: "1px solid #e2dfdf",
	borderRadius: "8px",
	boxShadow: "0 0 10px rgba(0,0,0,0.3)",
	padding: "20px",
	maxHeight: "calc(100vh - 150px)",
	overflowY: "scroll",
	p: {
		margin: "20px 0",
	},
})

export function Article({ title, content }: { title: string; content: string }) {
	const containerRef = useRef<HTMLDivElement>(null)

	return (
		<Container ref={containerRef}>
			<h1>{title}</h1>
			{/* https://blog.logrocket.com/using-dangerouslysetinnerhtml-react-application/ */}
			<div dangerouslySetInnerHTML={{ __html: `<p>${content}</p>` }} />
			<ToolBar containerRef={containerRef} />
		</Container>
	)
}
