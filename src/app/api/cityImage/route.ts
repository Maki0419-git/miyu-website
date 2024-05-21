import { getCityImage } from "@/app/(insert-ad-page)/weather/utils/getCityImage"
import { CustomError } from "@/utils/errorHandler"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const cityName = searchParams.get("cityName")
	if (!cityName) {
		return NextResponse.json({ error: "City name is required" }, { status: 400 })
	}
	try {
		const data = await getCityImage(cityName)
		return NextResponse.json({ data })
	} catch (error) {
		if (error instanceof CustomError) {
			return NextResponse.json({ error: error.message }, { status: error.statusCode })
		}
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
	}
}
