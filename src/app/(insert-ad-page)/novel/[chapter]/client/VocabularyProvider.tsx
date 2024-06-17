"use client"
import { Dispatch, SetStateAction, createContext, useState } from "react"
import { Vocabulary } from "../types"

interface VocabularyContextType {
	vocabularies: Vocabulary[]
	setVocabularies: Dispatch<SetStateAction<Vocabulary[]>>
	isPending: boolean
	setIsPending: Dispatch<SetStateAction<boolean>>
}

export const VocabularyContext = createContext<VocabularyContextType>({
	vocabularies: [],
	setVocabularies: () => {},
	isPending: false,
	setIsPending: () => {},
})

export function VocabularyProvider({ children }: { children: React.ReactNode }) {
	const [vocabularies, setVocabularies] = useState<Vocabulary[]>([])
	const [isPending, setIsPending] = useState(false)

	return (
		<VocabularyContext.Provider value={{ vocabularies, setVocabularies, isPending, setIsPending }}>
			{children}
		</VocabularyContext.Provider>
	)
}
