import { styled } from "@pigment-css/react"

const ContentWrapper = styled("div")({
	width: "70%",
	margin: "0 auto",
	backgroundColor: "#FFF",
	minHeight: "calc(100vh - 70px)",
	"@media (max-width: 1440px)": {
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
