"use client"
import { styled } from "@pigment-css/react"
import { ImageCard } from "./ImageCard"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons"

const Container = styled("div")({
	position: "relative",
})

const ImageCardsContainer = styled("div")({
	display: "flex",
	gap: "1rem",
	overflow: "hidden",
})

const ScrollButton = styled("button")({
	position: "absolute",
	bottom: "50%",
	margin: "1rem",
	transform: "translateY(100%)",
	border: "none",
	background: "none",
	cursor: "pointer",
})

const ScrollButtonRight = styled(ScrollButton)({
	right: "-5rem",
})

const ScrollButtonLeft = styled(ScrollButton)({
	left: "-5rem",
})

export function ImageCarousel() {
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
				{new Array(5).fill(0).map((_, index) => (
					<ImageCard
						key={index}
						src="https://picsum.photos/640"
						href="example.com"
						alt="alt"
						title="Test"
						description="Excepteur dolor laborum eu do non ea ad veniam et qui."
						aspectRatio={3 / 4}
						minWidth={300}
					/>
				))}
			</ImageCardsContainer>
			{isOverflowing && (
				<>
					<ScrollButtonRight onClick={handleClickRight}>
						<FontAwesomeIcon icon={faCircleChevronRight} size="3x" color="#2EC4B6" />
					</ScrollButtonRight>
					<ScrollButtonLeft onClick={handleClickLeft}>
						<FontAwesomeIcon icon={faCircleChevronLeft} size="3x" color="#2EC4B6" />
					</ScrollButtonLeft>
				</>
			)}
		</Container>
	)
}
