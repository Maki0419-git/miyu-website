import { styled } from "@pigment-css/react"
import Image from "next/image"
import heroImage from "../../assets/novel/novel.jpg"
import { RouteButton } from "./components/client"
import { neon } from "@neondatabase/serverless"
import { ChapterPreview, Novel } from "./types"
import { getDownloadURL, ref } from "firebase/storage"
import { firebaseStorage } from "../../libs/firebase"

const Hero = styled("div")({
	position: "relative",
	padding: "20px 40px",
	width: "100%",
	height: "calc( 100vh - 70px )",
})

const ImageMask = styled("div")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.3)",
})

const Content = styled("div")({
	width: "100%",
	height: "100%",
	position: "relative",
	zIndex: 1,
	display: "flex",
	gap: "40px",
})

const Intro = styled("div")({
	flex: 6,
	color: "#FFF",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	padding: "70px 30px",
	gap: "20px",
	h1: {
		fontWeight: "bold",
		marginBottom: "20px",
		fontSize: "3rem",
	},
	"h3,h4": {
		fontWeight: "normal",
		lineHeight: "2.5rem",
		textShadow: "0 0 10px rgba(0,0,0,0.8)",
	},
	button: {
		width: "20%",
		padding: "10px 20px",
		marginTop: "20px",
		backgroundColor: "#FF9F1C",
		color: "#FFF",
		border: "none",
		cursor: "pointer",
		borderRadius: "2px",
		transition: "all 0.3s",
		"&:hover": {
			backgroundColor: "#FFBF69",
			color: "#FFF",
		},
	},
})

const Chapter = styled("div")({
	flex: 4,
	padding: "20px 30px",
})
const ChapterList = styled("div")({
	padding: "20px 20px",
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	height: "100%",
	borderRadius: "10px",
	overflowY: "scroll",
	scrollbarColor: "#f2f2f2a2 #F2F2F2",
	backdropFilter: "brightness(90%) blur(2px)",
	h2: {
		color: "#FFF",
		fontWeight: "normal",
	},
})

const ChapterCard = styled("div")({
	position: "relative",
	aspectRatio: "16 / 9",
	minHeight: "350px",
	padding: "15px",
	borderRadius: "10px",
	cursor: "pointer",
	overflow: "hidden",
	"&:hover": {
		img: {
			transform: "scale(1.1)",
		},
	},
	img: {
		overflow: "hidden",
		borderRadius: "5px",
		objectFit: "cover",
		objectPosition: "center",
		transition: "transform .5s ease-in-out",
	},
	button: {
		position: "absolute",
		bottom: 20,
		right: 10,
		width: "20%",
		padding: "10px 20px",
		backgroundColor: "transparent",
		color: "#FFF",
		border: "1px solid #FFF",
		cursor: "pointer",
		borderRadius: "2px",
		boxShadow: "0 0 10px rgba(0,0,0,0.3)",
		transition: "all 0.3s",
		"&:hover": {
			backgroundColor: "#FF9F1C",
			color: "#FFF",
		},
	},
})

const ChapterIndex = styled("h1")({
	position: "absolute",
	right: 10,
	fontWeight: 500,
	transform: "translateY(-50%)",
	color: "#FFF",
	fontSize: "9rem",
})

const Info = styled("div")({
	position: "absolute",
	bottom: 10,
	left: 0,
	color: "#FFF",
	padding: "10px 20px",
	display: "flex",
	flexDirection: "column",
	gap: "5px",
	justifyContent: "space-between",
	h2: {
		fontWeight: "bold",
		textShadow: "0 0 10px rgba(0,0,0,0.8)",
		textDecoration: "underline",
		textDecorationColor: "#FF9F1C",
		textDecorationThickness: "5px",
		textUnderlineOffset: "-1px",
	},
	button: {
		width: "fit-content",
		padding: "10px 20px",
		marginTop: "20px",
		backgroundColor: "#FFF",
		color: "#FF9F1C",
		border: "1px solid #FF9F1C",
		cursor: "pointer",
		borderRadius: "5px",
		boxShadow: "0 0 10px rgba(0,0,0,0.3)",
		transition: "all 0.3s",
		"&:hover": {
			backgroundColor: "#FF9F1C",
			color: "#FFF",
		},
	},
})

const getNovel = async () => {
	try {
		const sql = neon(process.env.DATABASE_URL || "")
		/** enhance: use generic to defined type instead of using assertion */
		const novels = (await sql`select * from novel where id = 1;`) as Novel[]
		const chapters =
			(await sql`select id,title,image_file from chapter where novel_id = 1 order by id;`) as ChapterPreview[]
		const generateChaptersWithImgURL = async (chapters: ChapterPreview[]) => {
			const promises = chapters.map(async (chapter) => {
				const image_url = await getDownloadURL(ref(firebaseStorage, `novel/${chapter.image_file}` || ""))
				return { image_url, ...chapter }
			})
			const urls = await Promise.all(promises)
			return urls
		}
		const chaptersWithImgURL: ChapterPreview[] = await generateChaptersWithImgURL(chapters)
		return { novel: novels[0], chapters: chaptersWithImgURL }
	} catch (e) {
		throw e
	}
}

export default async function NovelPage() {
	const { novel, chapters } = await getNovel()

	return (
		<div>
			<Hero>
				<Content>
					<Intro>
						<h1>{novel.book_name}</h1>
						<h3>{novel.description}</h3>
						<h4>Written by : {novel.author}</h4>
						<RouteButton src="/novel/1">Read</RouteButton>
					</Intro>
					<Chapter>
						<ChapterList>
							<h2>Chapters</h2>
							{chapters.map((chapter: ChapterPreview) => {
								return (
									<ChapterCard key={chapter.id}>
										<Image src={chapter.image_url || ""} alt="hero" fill={true} priority />
										<ChapterIndex>{chapter.id < 10 ? `0${chapter.id}` : chapter.id}</ChapterIndex>
										<Info>
											<h2>{chapter.title}</h2>
										</Info>
										<RouteButton src={`/novel/${chapter.id}`}>Read</RouteButton>
									</ChapterCard>
								)
							})}
						</ChapterList>
					</Chapter>
				</Content>
				<Image priority={true} alt="hero" src={heroImage} fill={true} />
				<ImageMask />
			</Hero>
		</div>
	)
}
