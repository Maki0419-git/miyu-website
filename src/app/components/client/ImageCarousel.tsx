"use client"
import { styled } from "@pigment-css/react"
import { ImageCard } from "./ImageCard"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const Container = styled("div")({
	position: "relative",
})

const ImageCardsContainer = styled("div")({
	display: "flex",
	gap: "1rem",
	overflow: "hidden",
})

const ScrollButtonContainer = styled("div")({
	position: "absolute",
	bottom: "-2rem",
	right: "0",
})

const ScrollButton = styled("button")({
	border: "none",
	background: "transparent",
	cursor: "pointer",
	margin: "0 1rem",
})

const ASPECT_RATIO = 3 / 4
const MIN_WIDTH = 300

export type ImageData = {
	src: string
	title: string
	description: string
	alt: string
	href?: string
}

type ImageCarouselProps = {
	data: ImageData[]
	options?: {
		aspectRatio?: number
		minWidth?: number
	}
}

export function ImageCarousel({
	data,
	options = { aspectRatio: ASPECT_RATIO, minWidth: MIN_WIDTH },
}: ImageCarouselProps) {
	const { aspectRatio = ASPECT_RATIO, minWidth = MIN_WIDTH } = options
	const [isOverflowing, setIsOverflowing] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const handleClickRight = () => {
		ref.current?.scrollBy({
			top: 0,
			left: 300,
			behavior: "smooth",
		})
	}

	const handleClickLeft = () => {
		ref.current?.scrollBy({
			top: 0,
			left: -300,
			behavior: "smooth",
		})
	}

	const checkOverflow = () => {
		const container = ref.current
		if (container) {
			const isOverflow = container.scrollWidth > container.clientWidth
			setIsOverflowing(isOverflow)
		}
	}

	useEffect(() => {
		window.addEventListener("resize", checkOverflow)
		checkOverflow() // Initial check on mount

		return () => window.removeEventListener("resize", checkOverflow)
	}, [])

	return (
		<Container>
			<ImageCardsContainer ref={ref}>
				{data.map(({ src, href, alt, title, description }, index) => (
					<ImageCard
						key={index}
						src={src}
						href={href || ""}
						alt={alt}
						title={title}
						description={description}
						aspectRatio={aspectRatio}
						minWidth={minWidth}
					/>
				))}
			</ImageCardsContainer>
			{isOverflowing && (
				<ScrollButtonContainer>
					<ScrollButton onClick={handleClickLeft}>
						<FontAwesomeIcon icon={faArrowLeft} size="xl" color="gray" />
					</ScrollButton>
					<ScrollButton onClick={handleClickRight}>
						<FontAwesomeIcon icon={faArrowRight} size="xl" color="gray" />
					</ScrollButton>
				</ScrollButtonContainer>
			)}
		</Container>
	)
}
