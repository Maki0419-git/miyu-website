"use client"

import { styled } from "@pigment-css/react"
import Image from "next/image"
import Link from "next/link"

const Container = styled("div")({
	fontSize: "1rem",
	fontWeight: "bold",
	padding: "10px 5px",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	backgroundColor: "#2EC4B6",
	color: "#FFF",
	height: "70px",
})

const LogoWrapper = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
})

const LogoImage = styled(Image)({
	borderRadius: "50%",
	marginRight: "10px",
	objectFit: "cover",
	objectPosition: "center",
})

const PageWrapper = styled("div")({
	display: "flex",
	gap: "10px",
	alignItems: "center",
	justifyContent: "center",
})

export default function NavBar() {
	return (
		<Container>
			<LogoWrapper>
				<LogoImage src="/landing_photo.png" alt="Miyu Logo" width={50} height={50} priority />
				<Link href="/">Miyu website</Link>
			</LogoWrapper>
			<PageWrapper>
				<Link href="/weather">weather</Link>
				<Link href="/js-playground">JS playground</Link>
				<Link href="/novel">novel</Link>
			</PageWrapper>
		</Container>
	)
}
