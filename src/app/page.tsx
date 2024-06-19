import { keyframes, styled } from "@pigment-css/react"
import Image from "next/image"
import { Permanent_Marker, Kiwi_Maru } from "next/font/google"
import { ImageCarousel } from "./components/client"

const permanentMarker = Permanent_Marker({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
})

const kiwiMaru = Kiwi_Maru({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
})

const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
})

const HeroContainer = styled("main")({
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

const SectionContainer = styled("div")({
	width: "100%",
	padding: "2rem 6rem",
	border: "2px solid black",
	backgroundColor: "white",
})

const SectionTitle = styled("h2")({
	fontSize: "2rem",
})

const SectionDescription = styled("p")({
	fontSize: "1.5rem",
	width: "50%",
	margin: "2rem 0",
	color: "gray",
})

const HeroContent = styled("div")({
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
		<>
			<HeroContainer>
				<HeroContent>
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
					<h3 className={kiwiMaru.className}>Web Developer / Traveler / Otaku</h3>
				</HeroContent>
			</HeroContainer>
			<SectionContainer className={kiwiMaru.className}>
				<SectionTitle>おすすめのアニメ</SectionTitle>
				<SectionDescription>
					Irure deserunt veniam aute dolor magna sunt. In voluptate consectetur labore exercitation officia incididunt
					veniam aute eu laboris culpa irure incididunt non. Labore mollit ea et magna culpa nostrud pariatur occaecat
					aute pariatur ea cupidatat excepteur.
				</SectionDescription>
				<ImageCarousel />
			</SectionContainer>
			<SectionContainer className={kiwiMaru.className}>
				<SectionTitle>ココロに響く名台詞！</SectionTitle>
				<SectionDescription>
					Irure deserunt veniam aute dolor magna sunt. In voluptate consectetur labore exercitation officia incididunt
					veniam aute eu laboris culpa irure incididunt non. Labore mollit ea et magna culpa nostrud pariatur occaecat
					aute pariatur ea cupidatat excepteur.
				</SectionDescription>
			</SectionContainer>
		</>
	)
}
