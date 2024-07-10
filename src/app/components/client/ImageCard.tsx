"use client"
import { keyframes, styled } from "@pigment-css/react"
import Image, { ImageProps } from "next/image"
import Link from "next/link"
import React from "react"

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

type ImageCardProps = ImageProps & {
	title: string
	src: string
	alt: string
	aspectRatio: number
	description: string
	href: string
	minWidth: number
	children?: React.ReactNode
	eventListeners?: {
		onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void
		onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void
	}
	unOptimized?: boolean
	blurDataURL?: string
}

// eslint-disable-next-line react/display-name
export const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
	(
		{ src, eventListeners, href, alt, blurDataURL, minWidth, aspectRatio, unOptimized, children }: ImageCardProps,
		ref,
	) => {
		return (
			<Container aspectRatio={aspectRatio} minWidth={minWidth} {...eventListeners} ref={ref}>
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
					{children}
				</Link>
			</Container>
		)
	},
)

// ImageCard.displayName = "ImageCard"
