"use client"
import { styled } from "@pigment-css/react"
import Image from "next/image"
import { FadeUpSection } from "./FadeUpSection"

const Container = styled("div")({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	gap: "2rem",
})

const Quote = styled("div")({
	minWidth: "50%",
	maxWidth: "70%",
	padding: "1rem",
	borderRadius: "1rem",
	backgroundColor: "#f9f9f9",
	boxShadow: "0 0 15px rgba(0,0,0,0.3)",
	display: "flex",
	alignItems: "center",
	gap: "1rem",

	"@media (max-width: 425px)": {
		minWidth: "100%",
		maxWidth: "100%",
	},
})

const QuoteText = styled("div")({
	flexGrow: 1,
})

const QuoteMark = styled("div")({
	fontSize: "2rem",
	color: "#FFBF69",
})

const QuoteContent = styled("p")({
	marginLeft: "1rem",
	position: "relative",
	top: "-1rem",
})

const QuoteAuthor = styled("h6")({
	margin: "0",
	color: "#FFBF69",
	textAlign: "right",
})

const quotes = [
	{
		quote:
			"「“負け”は弱さの証明ですか？　君達にとって“負け”は試練なんじゃないですか？　地に這いつくばった後、また立って歩けるのかという　君達がそこの這いつくばったままならば　それこそが弱さの証明です」",
		author: "武田一鉄",
		src: "/animeQuote/takeda.png",
	},
	{
		quote: "「ー才能は開花させるもの　ーセンスは磨くもの！！！」",
		author: "及川徹",
		src: "/animeQuote/oikawa.png",
	},
	{
		quote: "「”楽”じゃなく、”楽しい”を考える」",
		author: "木兎光太郎",
		src: "/animeQuote/bokuto.png",
	},
	{
		quote:
			"「俺から見たら、みんなが才能を持っている。でもそれは、努力によって作れたもので。俺はその表面だけを見て、才能と言ってるだけ。」",
		author: "赤羽業",
		src: "/animeQuote/karuma.png",
	},
	{
		quote:
			"「君達は、強くなりすぎたのかもしれない。身に付けた力に酔い、弱い者の立場に立って考える事を忘れてしまった。」",
		author: "殺せんせい",
		src: "/animeQuote/korosennsei.png",
	},
]

export function Quotes() {
	return (
		<Container>
			{quotes.map(({ quote, author, src }, index) => (
				<FadeUpSection
					key={index}
					customizeStyles={{ display: "flex", justifyContent: index % 2 ? "flex-end" : "flex-start" }}
				>
					<Quote>
						<Image
							src={src}
							alt={author}
							width={100}
							height={100}
							style={{
								borderRadius: "50%",
								objectFit: "cover",
								objectPosition: "50% 50%",
							}}
						/>
						<QuoteText>
							<QuoteMark>“</QuoteMark>
							<QuoteContent>{quote}</QuoteContent>
							<QuoteAuthor>— {author}</QuoteAuthor>
						</QuoteText>
					</Quote>
				</FadeUpSection>
			))}
		</Container>
	)
}
