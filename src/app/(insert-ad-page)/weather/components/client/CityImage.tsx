"use client"

import Image, { ImageLoaderProps } from "next/image"

export function CityImage({
	src,
	dataURL,
	maxSolution = 1080,
}: {
	src: string
	dataURL?: string
	maxSolution?: number
}) {
	return (
		<Image
			src={src}
			alt="city image"
			fill={true}
			style={{
				objectFit: "cover",
				objectPosition: "center",
			}}
			placeholder="blur"
			blurDataURL={dataURL}
			loader={({ src, width }: ImageLoaderProps) => `${src}&w=${Math.min(width, maxSolution)}`}
		/>
	)
}
