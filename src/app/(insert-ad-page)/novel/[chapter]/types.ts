export enum OpenAIAPI {
	CREATE_VOCABULARY,
}

export type OpenAIAPIAlias = keyof typeof OpenAIAPI

export type OpenAIAPIResponseTypes = {
	hiragana: string
	type: string
	meaning: string
	example: Example
}

export interface Example {
	japanese: string
	chinese: string
}
