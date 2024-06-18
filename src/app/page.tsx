import { keyframes, styled } from "@pigment-css/react"
import Image from "next/image"
import { Permanent_Marker, Concert_One } from "next/font/google"

const permanentMarker = Permanent_Marker({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
})

const concertOne = Concert_One({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
})

const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
})

const Container = styled("main")({
	position: "relative",
	width: "100%",
	height: "calc( 100vh - 70px )",
	backgroundImage: "linear-gradient(#ffbe6974, #ffbe69cc),url('/landing_bg.png')",
	backgroundSize: "cover",
	backgroundPosition: "center",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
})

const Content = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "2rem",
	alignItems: "center",
	justifyContent: "center",
	color: "white",
	h2: {
		fontSize: "4rem",
		transform: "rotate(-5deg)",
	},
	h3: {
		fontSize: "1.5rem",
	},
	animation: `${fadeIn} 2s ease-in-out`,
})

export default function Home() {
	return (
		<Container>
			<Content>
				<Image
					priority={true}
					src="/landing_photo.png"
					alt="logo"
					width={250}
					height={250}
					style={{
						objectFit: "cover",
						objectPosition: "50% 100%",
						borderRadius: "50%",
						border: "2px solid white",
						boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
					}}
				/>
				<h2 className={permanentMarker.className}>- Asaka Miyu -</h2>
				<h3 className={concertOne.className}>Web Developer / Traveler / Otaku</h3>
			</Content>
		</Container>
	)
}
