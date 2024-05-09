import { Suspense } from "react"
import { styled } from "@pigment-css/react"
import { BottomSection } from "./components/client"
import { CurrentWeather, ThirtySixHoursWeather } from "./components/server"

const TopSection = styled("div")({
	display: "flex",
	width: "100%",
	justifyContent: "space-between",
	padding: "60px 80px",
	height: "60vh",
	backgroundImage:
		"linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1561105111-d592363f0472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTIxODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQwNTc1MTd8&ixlib=rb-4.0.3&q=80&w=2000')",
	backgroundSize: "cover",
	backgroundPosition: "center",
	backgroundColor: "#252746",
	"@media (max-width: 1440px)": {
		// flexDirection: "column",
		// height: "70vh",
		gap: "20px",
		padding: "30px 40px",
	},
})

export default async function WeatherPage({
	searchParams: { city = "臺北市" },
}: {
	searchParams: { [key: string]: string }
}) {
	return (
		<>
			<TopSection>
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
