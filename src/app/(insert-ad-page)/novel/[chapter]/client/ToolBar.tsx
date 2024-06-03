"use client"

import { styled } from "@pigment-css/react"
import { useCallback, useEffect, useRef, useState } from "react"

const Container = styled("div")<{ top: number; left: number }>({
	position: "absolute",
	top: (props) => props.top,
	left: (props) => props.left,
	backgroundColor: "white",
	fontSize: "12px",
	color: "#FFBF69",
	border: "1px solid #FFBF69",
	borderRadius: 5,
	boxShadow: "0 0 3px rgba(0,0,0,0.3)",
	"&:before": {
		position: "absolute",
		width: 0,
		height: 0,
		top: 28,
		content: '""',
		borderLeft: "8px solid transparent",
		borderRight: "8px solid transparent",
		borderTop: "8px solid #FFBF69",
		zIndex: 2,
	},
	button: {
		background: "none",
		color: "inherit",
		border: "none",
		padding: "2px 5px",
		font: "inherit",
		cursor: "pointer",
		outline: "inherit",
		borderRight: "1px solid #FFBF69",
	},
	"& button:hover": {
		backgroundColor: "#FFBF69",
		color: "#FFF",
		transition: "0.5s",
	},
})

export function ToolBar({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
	const [selectedText, setSelectedText] = useState("")
	const [position, setPosition] = useState({ top: 0, left: 0 })
	const rangeRef = useRef<Range | undefined>(undefined)

	const handleHighlight = useCallback(() => {
		const range = rangeRef.current
		if (range) {
			const span = document.createElement("span")
			span.style.backgroundColor = "#FFBF69"
			range.surroundContents(span)
		}
	}, [])

	useEffect(() => {
		const handleSelection = () => {
			const selection = window.getSelection()
			const selectedText = selection?.toString()
			if (selectedText) {
				setSelectedText(selectedText)
				const range = selection?.getRangeAt(0)
				rangeRef.current = range
				const rect = range?.getBoundingClientRect()
				if (rect) {
					setPosition({ top: rect.top - 40, left: rect.left })
				}
			} else {
				setSelectedText("")
			}
		}

		const container = containerRef.current
		container?.addEventListener("mouseup", handleSelection)

		return () => {
			container?.removeEventListener("mouseup", handleSelection)
		}
	}, [containerRef])

	return (
		selectedText && (
			<Container top={position.top} left={position.left}>
				<button onClick={handleHighlight}>highlight</button>
				<button>vocabulary card</button>
			</Container>
		)
	)
}
