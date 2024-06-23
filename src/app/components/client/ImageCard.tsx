"use client"
import { keyframes, styled } from "@pigment-css/react"
import Image, { ImageProps } from "next/image"
import Link from "next/link"
import React, { useCallback, useState } from "react"

const Container = styled("div")<{ aspectRatio: number; minWidth: number }>({
	position: "relative",
	borderRadius: "8px",
	width: "100%",
	height: "100%",
	boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
	overflow: "hidden",
	minWidth: (props) => props.minWidth || "auto",
	aspectRatio: (props) => props.aspectRatio,
})

const pulse = keyframes`
    0% {
        background-color: #d5d5d5;
    }
    50% {
        background-color: #f0f0f0;
    }
    100% {
        background-color: #d5d5d5;
    }
`

export const ImageCardSkeleton = styled(Container)({
	animation: `${pulse} 2s infinite ease-in-out`,
})

const Mask = styled("div")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,0.3) 80%, rgba(0, 0, 0, 0.9) 100%)",
	borderRadius: "8px",
})

const BottomSection = styled("div")<{ showDescription: boolean }>({
	position: "absolute",
	bottom: 0,
	left: 0,
	width: "100%",
	color: "white",
	padding: "1rem 1rem",
	overflowY: "scroll",
	background: (props) =>
		props.showDescription
			? "radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0, 0, 0, 0) 100%)"
			: "transparent",
	transition: "all 0.3s",
	transform: (props) => (props.showDescription ? "translateY(0)" : "translateY(calc(100% - 4rem))"),
})

const AnimatedTitle = styled("h3")({
	textDecoration: "underline",
	textDecorationColor: "#FF9F1C",
	textDecorationThickness: "4px",
	fontSize: "1.5rem",
	transition: "transform 0.3s",
	position: "sticky",
	top: 0,
})

const AnimatedDescription = styled("p")({
	margin: "1rem 0",
	maxHeight: "10rem",
	overflowY: "scroll",
})

type ImageCardProps = ImageProps & {
	title: string
	src: string
	alt: string
	aspectRatio: number
	description: string
	href: string
	minWidth: number
	unOptimized?: boolean
	blurDataURL?: string
}

// eslint-disable-next-line react/display-name
export const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
	({ src, title, description, href, alt, blurDataURL, minWidth, aspectRatio, unOptimized }: ImageCardProps, ref) => {
		const [showDescription, setShowDescription] = useState(false)

		const onMouseEnter = useCallback(() => setShowDescription(true), [])

		const onMouseLeave = useCallback(() => setShowDescription(false), [])

		return (
			<Container
				aspectRatio={aspectRatio}
				minWidth={minWidth}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				ref={ref}
			>
				<Link href={href}>
					<Image
						src={src}
						alt={alt}
						fill
						priority
						unoptimized={unOptimized}
						style={{
							position: "absolute",
							objectFit: "cover",
							objectPosition: "center",
						}}
						{...(blurDataURL ? { blurDataURL, placeholder: "blur" } : {})}
					/>
					<Mask />
					<BottomSection showDescription={showDescription}>
						<AnimatedTitle>{title}</AnimatedTitle>
						<AnimatedDescription>{description}</AnimatedDescription>
					</BottomSection>
				</Link>
			</Container>
		)
	},
)

// ImageCard.displayName = "ImageCard"
