import { styled } from "@pigment-css/react"
import { IPhoneMock } from "./components/client"
import { ProgramCard } from "./components/server"
/** ref: https://docs.fontawesome.com/web/use-with/react/use-with */
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

const Container = styled("div")({
	padding: "20px",
	p: {
		marginBottom: "20px",
	},
})

export default async function JSPlaygroundPage() {
	return (
		<Container>
			<h1>JS Playground</h1>
			<p>Try to do everything with JS ...</p>
			<ProgramCard
				title="iPhone Lock Screen"
				description='This is a program that mock iphone&apos;s lock screen.The default password is "1234".You also can set password by yourself.'
			>
				<IPhoneMock />
			</ProgramCard>
		</Container>
	)
}
