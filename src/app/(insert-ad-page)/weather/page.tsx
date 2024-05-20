import { Suspense } from "react"
import { styled } from "@pigment-css/react"
import { BottomSection, CityImage } from "./components/client"
import { CurrentWeather, ThirtySixHoursWeather } from "./components/server"
import { getCityImage } from "./action"

const TopSection = styled("div")({
	display: "flex",
	width: "100%",
	justifyContent: "space-between",
	padding: "60px 80px",
	position: "relative",
	backgroundColor: "#252746",
	"@media (max-width: 1440px)": {
		flexDirection: "column",
		gap: "20px",
		padding: "10px 20px",
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
				<CityImage src={cityImageData.url} />
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
