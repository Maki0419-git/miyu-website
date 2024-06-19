import { styled } from "@pigment-css/react"
import Image from "next/image"

const Container = styled("div")({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	gap: "5rem",
})

const Quote = styled("div")<{ alignSelf: string }>({
	alignSelf: (props) => props.alignSelf,
	padding: "2rem",
	borderRadius: "1rem",
	backgroundColor: "#f9f9f9",
	boxShadow: "0 0 15px rgba(0,0,0,0.3)",
	display: "flex",
	alignItems: "center",
	gap: "10px",
})

const QuoteText = styled("div")({})

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

export function Quotes() {
	return (
		<Container>
			{new Array(5).fill(0).map((_, index) => (
				<Quote key={index} alignSelf={index % 2 ? "flex-end" : "flex-start"}>
					<Image
						src="https://picsum.photos/200"
						alt="logo"
						width={100}
						height={100}
						style={{
							borderRadius: "50%",
						}}
					/>
					<QuoteText>
						<QuoteMark>“</QuoteMark>
						<QuoteContent>
							｢負けは今の力の認識であっても弱さの証明ではない 君たちの何もここで終わらない これからも 何だってできる!!!｣
						</QuoteContent>
						<QuoteAuthor>— 武田一鉄</QuoteAuthor>
					</QuoteText>
				</Quote>
			))}
		</Container>
	)
}
