"use client"

import { styled } from "@pigment-css/react"
import Image from "next/image"
import useCity from "../../../../hooks/useCity"
import { useEffect, useRef, useState } from "react"
import SuggestionList from "./SuggestionList"
import useDebounceValue from "../../../../hooks/useDebounceValue"
import { usePathname, useRouter } from "next/navigation"

const Container = styled("div")({
	height: "30vh",
	"@media (max-width: 1024px)": {
		height: "20vh",
	},
})

const SearchBarContainer = styled("form")({
	position: "relative",
	marginTop: "10px",
	minWidth: "430px",
	height: "40px",
	borderRadius: "40px",
	boxShadow: " 0 6px 8px rgba(0, 0, 0, 0.15)",
	background: "#fff",
	border: "1px solid #f3f3f3",
	transition: "all 0.3s ease",
	"&:hover": {
		boxShadow: "0 6px 8px rgba(0, 0, 0, 0.3)",
	},
})

const Input = styled("input")({
	position: "absolute",
	left: "30px",
	width: "calc(100% - 30px)",
	height: "100%",
	borderRadius: "40px",
	border: "none",
	outline: "none",
	background: "transparent",
	fontSize: "14px",
})

const SearchButton = styled("button")({
	position: "absolute",
	top: "5px",
	right: "10px",
	width: "30px",
	height: "30px",
	borderRadius: "50%",
	border: "none",
	outline: "none",
	background: "#f3f3f3",
	cursor: "pointer",
	transition: "all 0.3s ease",
	"&:hover": {
		background: "#f8f8f8",
	},
	"&:focus": {
		background: "#f8f8f8",
	},
})

type SearchBarProps = {
	handlePlaceChange: (place: string) => void
}

export default function SearchBar({ handlePlaceChange }: SearchBarProps) {
	const [inputValue, setInputValue] = useState<string>("")
	const [query, setQuery] = useState<string>("")
	const isQueryValueLocked = useRef(false)
	const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined)
	const debouncedQuery = useDebounceValue<string>(query, 500)
	const { cities } = useCity(debouncedQuery)
	const router = useRouter()
	const pathname = usePathname()
	const suggestionListRef = useRef<HTMLUListElement>(null)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setInputValue(e.target.value)
		if (!isQueryValueLocked.current) setQuery(e.target.value)
	}

	const handleCompositionStart = () => {
		isQueryValueLocked.current = true
	}

	const handleCompositionEnd = () => {
		isQueryValueLocked.current = false
		setQuery(inputValue)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "ArrowDown") {
			event.preventDefault()
			if (selectedIndex === undefined || selectedIndex === cities.length - 1) {
				setSelectedIndex(0)
				if (suggestionListRef.current) {
					suggestionListRef.current.scrollTo(0, 0)
				}
			} else {
				setSelectedIndex(selectedIndex + 1)
				if (suggestionListRef.current) {
					suggestionListRef.current.scrollTop += 40
				}
			}
		}
		if (event.key === "ArrowUp") {
			event.preventDefault()
			if (selectedIndex === undefined || selectedIndex === 0) {
				setSelectedIndex(cities.length - 1)
				if (suggestionListRef.current) {
					suggestionListRef.current.scrollTo(0, suggestionListRef.current.scrollHeight)
				}
			} else {
				setSelectedIndex(selectedIndex - 1)
				if (suggestionListRef.current) {
					suggestionListRef.current.scrollTop -= 40
				}
			}
		}
		if (event.key === "Enter" && selectedIndex !== undefined) {
			event.preventDefault()
			router.push(`${pathname}?city=${cities[selectedIndex]}`)
			handlePlaceChange(cities[selectedIndex])
			setInputValue("")
			setQuery("")
		}
	}

	// redefined the selectedIndex when the cities array changes
	useEffect(() => {
		setSelectedIndex(undefined)
	}, [cities.length])

	return (
		<Container>
			<h2>Where are you searching for...</h2>
			<SearchBarContainer>
				<Input
					type="text"
					placeholder="Search for a city"
					value={inputValue}
					onChange={handleChange}
					onCompositionStart={handleCompositionStart}
					onCompositionEnd={handleCompositionEnd}
					onKeyDown={handleKeyDown}
				/>
				<SearchButton type="submit">
					<Image src="/search.svg" alt="Search Icon" width={20} height={20} />
				</SearchButton>
			</SearchBarContainer>
			{cities.length !== 0 && (
				<SuggestionList suggestions={cities} selectedIndex={selectedIndex} ref={suggestionListRef} />
			)}
		</Container>
	)
}
