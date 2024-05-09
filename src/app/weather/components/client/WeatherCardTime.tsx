"use client"
import dayjs from "dayjs"
import { isPast } from "../../utils/isPast"
import { styled } from "@pigment-css/react"
import { isTomorrow } from "../../utils/isTomorrow"

const Ribbon = styled("div")({
	"&:before": {
		position: "absolute",
		content: '""',
		width: 0,
		height: 0,
		top: "24px",
		left: "-18px",
		borderTop: "16px solid transparent",
		borderBottom: "16px solid transparent",
		borderRight: "16px solid #3949ab",
	},
	"&:after": {
		position: "absolute",
		content: '"明天"',
		top: "0.6rem",
		left: "-1.2rem",
		padding: "0.3rem 0rem",
		width: "5rem",
		background: "#3949ab",
		color: "white",
		textAlign: "center",
		fontFamily: "Roboto, sans-serif",
		boxShadow: "4px 4px 15px rgba(26, 35, 126, 0.2)",
	},
})

export function WeatherCardTime({ dateTime }: { dateTime: string }) {
	const time = dayjs(dateTime).format("hh:mm A")

	return (
		<>
			{isTomorrow(dayjs(dateTime)) && <Ribbon />}
			<h3>{isPast(dayjs(dateTime)) ? "Now" : time}</h3>
		</>
	)
}
