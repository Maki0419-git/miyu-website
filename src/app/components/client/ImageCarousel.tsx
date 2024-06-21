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
						description="Excepteur dolor laborum eu do non ea ad veniam et qui.Excepteur dolor laborum eu do non ea ad veniam et qui.Excepteur dolor laborum eu do non ea ad veniam et qui.Excepteur dolor laborum eu do non ea ad veniam et qui.Excepteur dolor laborum eu do non ea ad veniam et qui.Excepteur dolor laborum eu do non ea ad veniam et qui."
						aspectRatio={3 / 4}
						minWidth={300}
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
