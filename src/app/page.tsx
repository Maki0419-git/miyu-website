import { keyframes, styled } from "@pigment-css/react"
import Image from "next/image"
import { Permanent_Marker, Kiwi_Maru } from "next/font/google"
import { FadeUpSection, Quotes } from "./components/client"
import { RecommendAnime } from "./components/server"
import { Suspense } from "react"

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
	minHeight: "30vh",
	padding: "2rem 15rem",

	"@media (max-width: 425px)": {
		padding: "2rem 1rem",
	},
})

const SectionTitle = styled("h2")({
	fontSize: "2rem",
})

const SectionDescription = styled("p")({
	fontSize: "1.3rem",
	width: "70%",
	margin: "2rem 0",
	color: "gray",

	"@media (max-width: 425px)": {
		width: "100%",
	},
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
					<h3 className={permanentMarker.className}>Web Developer / Traveler / Otaku</h3>
				</HeroContent>
			</HeroContainer>
			<Suspense fallback={<div>Loading...</div>}>
				<FadeUpSection>
					<SectionContainer className={kiwiMaru.className}>
						<SectionTitle>おすすめのアニメ</SectionTitle>
						<SectionDescription>
							特に好きなアニメについて紹介したいと思います。以下に挙げる作品は、ストーリー、キャラクター、ビジュアル、音楽など、全ての面で素晴らしいと感じたものばかりです。これらのアニメは、見る人に深い感動や楽しさを提供してくれることでしょう。
						</SectionDescription>
						<RecommendAnime />
					</SectionContainer>
				</FadeUpSection>
			</Suspense>
			<FadeUpSection>
				<SectionContainer className={kiwiMaru.className}>
					<SectionTitle>ココロに響く名台詞！</SectionTitle>
					<SectionDescription>
						アニメの中には、視聴者の心に深く刻まれる名台詞が数多く存在します。これらの台詞は、キャラクターの思いや物語のテーマを象徴し、時には人生の教訓を与えてくれることもあります。以下に、特に心に響いた名台詞をいくつかご紹介します。
					</SectionDescription>
					<Quotes />
				</SectionContainer>
			</FadeUpSection>
		</>
	)
}
