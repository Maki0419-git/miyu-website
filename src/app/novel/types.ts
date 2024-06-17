export interface Novel {
	id: number
	book_name: string
	description: string
	create_date: Date
	author: string
}

export interface ChapterPreview {
	id: number
	title: string
	novel_id?: number
	image_file?: string
	image_url?: string
}

export interface Chapter extends ChapterPreview {
	content: string
}
