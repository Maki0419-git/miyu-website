import { Suspense } from "react"
import { styled } from "@pigment-css/react"
import { CurrentWeather, ThirtySixHoursWeather } from "./components/server"
import { getCityImage } from "./utils/getCityImage"
import { BottomSection, CityImage } from "./components/client"

const TopSection = styled("div")({
	display: "flex",
	width: "100%",
	height: "500px",
	justifyContent: "space-between",
	padding: "60px 80px",
	position: "relative",
	backgroundColor: "#252746",
	"@media (max-width: 1024px)": {
		flexDirection: "column",
		padding: "10px 20px",
		"@media (max-width: 1024px)": {
			h1: {
				fontSize: "24px",
			},
			h2: {
				fontSize: "16px",
			},
			h3: {
				fontSize: "14px",
			},
			h4: {
				fontSize: "12px",
			},
			h5: {
				fontSize: "10px",
			},
		},
	},
})

const ImageMask = styled("div")({
	position: "absolute",
	width: "100%",
	height: "100%",
	zIndex: 0,
	top: 0,
	left: 0,
	backgroundColor: "rgba(0, 0, 0, 0.3)",
})

export default async function WeatherPage({
	searchParams: { city = "臺北市" },
}: {
	searchParams: { [key: string]: string }
}) {
	const cityImageData = await getCityImage(city)

	return (
		<>
			<TopSection>
				<CityImage src={cityImageData.url} dataURL={cityImageData.dataURL} />
				<ImageMask />
				<Suspense fallback={<div>Loading...</div>}>
					<CurrentWeather city={city} />
				</Suspense>
				<Suspense fallback={<div>Loading...</div>}>
					<ThirtySixHoursWeather city={city} />
				</Suspense>
			</TopSection>
			<BottomSection />
		</>
	)
}
