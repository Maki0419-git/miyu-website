import { Vocabulary } from "../types"

export const generateFakeVocabulary = (length: number = 5): Vocabulary[] => {
	return Array.from({ length }, (_, index) => {
		return {
			vocabulary: `fakeVocabulary${index}`,
			hiragana: "fakeHiragana",

			type: "fakeType",
			meaning: "Aute dolore magna id aliquip amet cillum anim reprehenderit enim duis.",
			example: {
				japanese: "Eu culpa quis irure ex commodo ut aliquip mollit sunt deserunt aliquip tempor sit.",
				chinese: "Elit cillum dolore irure non.",
			},
		}
	})
}
