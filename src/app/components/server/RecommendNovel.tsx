import { getNovel } from "@/app/novel/page"
import { NovelImageCarousel } from "../client/NovelImageCarousel"
import { ImageData } from "../client"

export async function RecommendNovel() {
	const { chapters } = await getNovel()

	const data = chapters.map(
		(chapter) =>
			({
				id: chapter.id,
				src: chapter.image_url || "",
				title: chapter.title,
				alt: chapter.title,
				href: `/novel/${chapter.id}`,
			}) as ImageData,
	)

	return <NovelImageCarousel data={data} />
}
