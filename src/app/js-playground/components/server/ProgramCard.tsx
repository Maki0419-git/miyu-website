import { styled } from "@pigment-css/react"

type ProgramProps = {
	children: React.ReactNode
	title: string
	description: string
}

const Card = styled("div")({
	padding: "20px",
	border: "1px solid #ddd",
	borderRadius: "10px",
	boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
	marginBottom: "20px",
	backgroundColor: "#fff",
	width: "50%",
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
	"& > h4": {
		marginTop: "10px",
		marginBottom: "10px",
		fontSize: "20px",
		color: "#333",
	},
	"& > p": {
		color: "#666",
		lineHeight: "1.5",
	},
})

export function ProgramCard({ children, title, description }: ProgramProps) {
	return (
		<Card>
			{children}
			<h4>{title}</h4>
			<p>{description}</p>
		</Card>
	)
}
