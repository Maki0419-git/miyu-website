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
			placeholder={dataURL ? "blur" : undefined}
			blurDataURL={dataURL}
			loader={({ src, width }: ImageLoaderProps) => {
				const url = new URL(src)
				if (url.hostname === "picsum.photos") {
					return src
				} else {
					return `${src}&w=${Math.min(width, maxSolution)}`
				}
			}}
		/>
	)
}
