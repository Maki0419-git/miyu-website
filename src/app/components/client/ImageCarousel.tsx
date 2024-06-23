"use client"
import { styled } from "@pigment-css/react"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { ImageCard, ImageCardSkeleton } from "./ImageCard"

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
const UN_OPTIMIZED = false

export type ImageData = {
	id: number
	src: string
	title: string
	description: string
	alt: string
	href?: string
}

type BaseImageCarouselProps = {
	data: ImageData[]
	options?: {
		aspectRatio?: number
		minWidth?: number
		unOptimized?: boolean
	}
}

type LazyLoadOptions = {
	lazyLoad: true
	fetchMoreData: (offset?: number, limit?: number) => Promise<ImageData[]>
}

type NonLazyLoadOptions = {
	lazyLoad?: false
	fetchMoreData?: never
}

type ImageCarouselProps = BaseImageCarouselProps & {
	options: BaseImageCarouselProps["options"] & (LazyLoadOptions | NonLazyLoadOptions)
}

export function ImageCarousel({
	data,
	options = { aspectRatio: ASPECT_RATIO, minWidth: MIN_WIDTH, unOptimized: false, lazyLoad: false },
}: ImageCarouselProps) {
	const [imageData, setImageData] = useState<ImageData[]>(data)
	const [pending, setPending] = useState(false)
	const {
		aspectRatio = ASPECT_RATIO,
		minWidth = MIN_WIDTH,
		unOptimized = UN_OPTIMIZED,
		lazyLoad = false,
		fetchMoreData,
	} = options
	const [isOverflowing, setIsOverflowing] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const observerRef = useRef<IntersectionObserver | null>(null)
	const targetRef = useRef<HTMLDivElement | null>(null)

	const handleClickRight = () => {
		ref.current?.scrollBy({
			top: 0,
			left: minWidth,
			behavior: "smooth",
		})
	}

	const handleClickLeft = () => {
		ref.current?.scrollBy({
			top: 0,
			left: -minWidth,
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
		if (lazyLoad && fetchMoreData && targetRef.current && !observerRef.current) {
			const observer = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach(async (entry) => {
						if (entry.isIntersecting) {
							setPending(true)
							const newImageData = await fetchMoreData(imageData[imageData.length - 1].id, 5)
							setPending(false)
							if (newImageData.length > 0) {
								setImageData((prev) => [...prev, ...newImageData])
							}
							observer.unobserve(entry.target)
						}
					})
				},
				{
					threshold: 1,
				},
			)
			observerRef.current = observer
			observer.observe(targetRef.current)

			return () => {
				observer.disconnect()
				observerRef.current = null
			}
		}
	}, [fetchMoreData, imageData, lazyLoad])

	useEffect(() => {
		window.addEventListener("resize", checkOverflow)
		checkOverflow() // Initial check on mount

		return () => window.removeEventListener("resize", checkOverflow)
	}, [])

	return (
		<Container>
			<ImageCardsContainer ref={ref}>
				{imageData.map(({ src, href, alt, title, description, id }, index) => (
					<ImageCard
						key={id}
						src={src}
						href={href || ""}
						alt={alt}
						title={title}
						description={description}
						aspectRatio={aspectRatio}
						minWidth={minWidth}
						unOptimized={unOptimized}
						ref={(element) => {
							if (element && index === imageData.length - 1 && lazyLoad) {
								targetRef.current = element
							}
						}}
					/>
				))}
				{pending && <ImageCardSkeleton aspectRatio={aspectRatio} minWidth={minWidth} />}
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
