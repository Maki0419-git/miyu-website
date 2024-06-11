export enum OpenAIAPI {
	CREATE_VOCABULARY,
}

export type OpenAIAPIAlias = keyof typeof OpenAIAPI

export type VocabularyResponseType = Record<string, Info>

export interface Info {
	hiragana: string
	type: string
	meaning: string
	example: Example
}

export interface Example {
	japanese: string
	chinese: string
}

export type Vocabulary = {
	vocabulary: string
	hiragana: string
	type: string
	meaning: string
	example: Example
}
