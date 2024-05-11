"use client"

import Image, { ImageLoaderProps } from "next/image"

export function CityImage({ src, maxSolution = 1080 }: { src: string; maxSolution?: number }) {
	return (
		<Image
			src={src}
			alt="city image"
			fill={true}
			style={{
				objectFit: "cover",
				objectPosition: "center",
			}}
			loader={({ src, width }: ImageLoaderProps) => `${src}&w=${Math.min(width, maxSolution)}`}
		/>
	)
}
