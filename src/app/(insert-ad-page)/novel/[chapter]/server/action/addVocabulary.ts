"use server"
import { neon } from "@neondatabase/serverless"
import { Vocabulary } from "../../types"

export default async function addVocabulary(vocabularyList: Vocabulary[], reference: string) {
	const sql = neon(process.env.DATABASE_URL || "")
	const transformedData = vocabularyList.map(
		({ vocabulary, type, hiragana, meaning, example: { chinese, japanese } }) => [
			reference,
			vocabulary,
			type,
			hiragana,
			meaning,
			chinese,
			japanese,
			new Date().toISOString(),
		],
	)

	try {
		const query = `
        insert into vocabulary 
        (reference, vocabulary, vocabulary_type, hiragana, meaning, chinese_example, japanese_example, create_date) 
        values 
        ${transformedData.map((_, index) => `($${index * 8 + 1}, $${index * 8 + 2}, $${index * 8 + 3}, $${index * 8 + 4}, $${index * 8 + 5}, $${index * 8 + 6}, $${index * 8 + 7}, $${index * 8 + 8})`).join(", ")}
    `
		const params = transformedData.flat() // Flatten the array to pass as parameters

		await sql(query, params)

		console.log("Insert successful")
	} catch (error) {
		console.error("Error inserting vocabulary:", error)
	}
}
