import { styled } from "@pigment-css/react"

const ContentWrapper = styled("div")({
	width: "70%",
	height: "calc(100vh - 70px)",
	margin: "0 auto",
	backgroundColor: "#FFF",
	"@media (max-width: 1024px)": {
		width: "100%",
	},
})

export default function InsertAdLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <ContentWrapper>{children}</ContentWrapper>
}
