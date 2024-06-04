import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
})

export async function POST(request: NextRequest) {
	try {
		const { vocabulary } = await request.json()

		const params: OpenAI.Chat.ChatCompletionCreateParams = {
			model: "gpt-3.5-turbo",
			response_format: { type: "json_object" },
			messages: [
				{
					role: "system",
					content: `你是一個日中辭典，將日文單字翻譯成繁體中文，並用 JSON 格式回答問題：{<單字>:{"hiragana":<平假名>,"type":<詞性>,"meaning":<意思>,"example":{"japanese":<日文例句>,"chinese":<中文例句>}}}，如果遇到句子，則按照此格式回答句子內的每一個單字`,
				},
				{
					role: "user",
					content: vocabulary,
				},
			],
		}
		const completion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params)

		const response = completion.choices[0].message.content
		return NextResponse.json(response)
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
