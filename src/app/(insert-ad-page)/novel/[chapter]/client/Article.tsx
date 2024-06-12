"use client"

import { styled } from "@pigment-css/react"
import { useRef } from "react"
import { ToolBar } from "./ToolBar"

const Container = styled("article")({
	flex: 7,
	margin: "20px",
	lineHeight: "2",
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
