"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faUnlock, faGear, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { keyframes, styled } from "@pigment-css/react"
import { useEffect, useState } from "react"

const Container = styled("div")({
	width: "100%",
	backgroundImage: "url(/screen_lock_image.png)",
	backgroundSize: "cover",
	position: "relative",
	borderRadius: "10px",
	overflow: "hidden",
	h2: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		color: "#fbfbfb",
		textShadow: "0 0 10px rgba(0,0,0,1)",
		cursor: "pointer",
	},
})

const zoomOut = keyframes({
	from: {
		transform: "scale(1)",
	},
	to: {
		transform: "scale(0)",
		opacity: 0,
	},
})

const stretchRight = keyframes({
	"0%": {
		transform: "translateX(0)",
	},
	"50%": {
		transform: "translateX(10px)",
	},
	"100%": {
		transform: "translateX(0)",
	},
})

const LockScreen = styled("div")<{ mode: string }>({
	backdropFilter: "blur(5px)",
	padding: "30px 20px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "20px",
	animation: (props) => (props.mode === "unlock" ? `${zoomOut} 0.8s forwards` : ``),
	h3: {
		color: "#fbfbfb",
		textShadow: "0 0 10px rgba(0,0,0,1)",
	},
	button: {
		alignSelf: "flex-end",
		backgroundColor: "#fbfbfbbb",
		boxShadow: "0 0 10px rgba(0,0,0,0.2)",
		padding: "10px 15px",
		borderRadius: "5px",
		border: "none",
		"&:hover": {
			svg: { animation: `${stretchRight} 1s` },
			cursor: "pointer",
		},
	},
})

const ButtonRowContainer = styled("div")({
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	button: {
		width: "80px",
		height: "80px",
		padding: "10px 10px",
		margin: "10px",
		borderRadius: "50%",
		fontSize: "1.5rem",
		border: "1px solid  white",
		backgroundColor: "transparent",
		color: "white",
		cursor: "pointer",
		textShadow: "0 0 10px rgba(0,0,0,1)",
		"&:hover": {
			backgroundColor: "#f1f5f97d",
		},
	},
})

const ValueContainer = styled("div")({
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	marginBottom: "10px",
})

const Value = styled("div")<{ isPressed: boolean }>({
	width: "10px",
	height: "10px",
	borderRadius: "50%",
	border: "1px solid white",
	backgroundColor: (props) => (props.isPressed ? "white" : "transparent"),
	margin: "5px",
})

type Mode = "setting" | "lock" | "wrong" | "unlock"

const VALUE = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
const PASSWORD_LIMIT = 4
/** ref: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from */
const ButtonValueArray = (column: number): string[][] =>
	Array.from({ length: Math.ceil(VALUE.length / column) }, (_, row) => VALUE.slice(row * column, row * column + column))

const getIcon = (mode: Mode) => {
	switch (mode) {
		case "lock":
		case "wrong":
			return faLock

		case "setting":
			return faGear
		case "unlock":
			return faUnlock
		default:
			return faLock
	}
}

const getDescription = (mode: Mode) => {
	switch (mode) {
		case "lock":
			return "please enter password"
		case "wrong":
			return "password incorrect"
		case "setting":
			return "please set password"
		case "unlock":
			return "password correct"
		default:
			return "please enter password"
	}
}

export function IPhoneMock() {
	const [password, setPassword] = useState<string>("1234")
	const [mode, setMode] = useState<Mode>("lock")

	const checkPassword = (value: string) => {
		if (value === password) {
			setMode("unlock")
		} else {
			setMode("wrong")
		}
	}

	const setNewPassword = (value: string) => {
		setPassword(value)
		setMode("lock")
	}

	const resetProgram = () => {
		setMode("lock")
		setPassword("1234")
	}

	return (
		<Container>
			<h2 onClick={resetProgram}>Retry</h2>
			<LockScreen mode={mode}>
				<FontAwesomeIcon icon={getIcon(mode)} color="white" />
				<h3>{getDescription(mode)}</h3>
				<PasswordButtons OnReachPasswordLimit={mode === "setting" ? setNewPassword : checkPassword} />
				<button onClick={() => setMode("setting")}>
					Set Password <FontAwesomeIcon icon={faArrowRight} />
				</button>
			</LockScreen>
		</Container>
	)
}

const PasswordButtons = ({ OnReachPasswordLimit }: { OnReachPasswordLimit: (value: string) => void }) => {
	const [pressedValue, setPressedValue] = useState<string>("")
	const pressedValueInArray = pressedValue.split("")

	useEffect(() => {
		if (pressedValueInArray.length === PASSWORD_LIMIT) {
			OnReachPasswordLimit(pressedValue)
			setPressedValue("")
		}
	}, [pressedValueInArray, pressedValue, OnReachPasswordLimit])

	return (
		<div>
			<ValueContainer>
				{Array.from({ length: 4 }, () => "").map((_, index) => {
					return <Value key={index} isPressed={index <= pressedValueInArray.length - 1} />
				})}
			</ValueContainer>
			{ButtonValueArray(3).map((row, index) => {
				return (
					<ButtonRowContainer key={index}>
						{row.map((buttonValue) => {
							return (
								<button key={buttonValue} onClick={() => setPressedValue(pressedValue + buttonValue)}>
									{buttonValue}
								</button>
							)
						})}
					</ButtonRowContainer>
				)
			})}
		</div>
	)
}
