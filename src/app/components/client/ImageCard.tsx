"use client"
import { styled } from "@pigment-css/react"
import Image, { ImageProps } from "next/image"
import Link from "next/link"

const Container = styled("div")<{ aspectRatio: number; minWidth?: number }>({
	position: "relative",
	borderRadius: "8px",
	width: "100%",
	height: "100%",
	boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
	overflow: "hidden",
	minWidth: (props) => props.minWidth || "auto",
	aspectRatio: (props) => props.aspectRatio,
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

const BottomSection = styled("div")({
	position: "absolute",
	bottom: 0,
	left: 0,
	width: "100%",
	color: "white",
	padding: "1rem 1rem",
	h3: {
		textDecoration: "underline",
		textDecorationColor: "#FF9F1C",
		textDecorationThickness: "4px",
		fontSize: "1.5rem",
	},
	p: {
		margin: "1rem 0",
	},
})

type ImageCardProps = ImageProps & {
	title: string
	src: string
	alt: string
	aspectRatio: number
	minWidth?: number
	href: string
	blurDataURL?: string
	description?: string
}

export function ImageCard({ src, title, description, href, alt, blurDataURL, minWidth, aspectRatio }: ImageCardProps) {
	return (
		<Container aspectRatio={aspectRatio} minWidth={minWidth}>
			<Link href={href}>
				<Image
					src={src}
					alt={alt}
					fill
					priority
					style={{
						position: "absolute",
						objectFit: "cover",
						objectPosition: "center",
					}}
					{...(blurDataURL ? { blurDataURL, placeholder: "blur" } : {})}
				/>
				<Mask />
				<BottomSection>
					<h3>{title}</h3>
					{description && <p>{description}</p>}
				</BottomSection>
			</Link>
		</Container>
	)
}
