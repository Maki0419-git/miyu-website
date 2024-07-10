"use client"
import { styled } from "@pigment-css/react"
import { ImageCarousel, ImageData } from "./ImageCarousel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

const MaskColor = ["#90CAF9", "#9FA8DA", "#CE93D8", "#FFCC80"]

const Mask = styled("div")<{ bgColor: string }>({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	background: (props) => props.bgColor,
	opacity: 0.7,
	borderRadius: "8px",
})

const Content = styled("div")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "flex-start",
	padding: "1rem",
	h3: {
		fontSize: "1.5rem",
		color: "white",
		textShadow: "0 0 10px rgba(0,0,0,0.8)",
	},
})

export function NovelImageCarousel({ data }: { data: ImageData[] }) {
	return (
		<ImageCarousel
			data={data}
			options={{ aspectRatio: 1 / 1, minWidth: 300, unOptimized: false, lazyLoad: false }}
			customizedCardContent={({ id, title }) => (
				<>
					<Mask bgColor={MaskColor[id - 1]} />
					<Content>
						<h3>{title}</h3>
						<FontAwesomeIcon icon={faArrowUpRightFromSquare} size="2xl" color="white" />
					</Content>
				</>
			)}
		/>
	)
}
