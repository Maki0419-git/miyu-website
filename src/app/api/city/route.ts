import { CityCountyData } from "@/app/(insert-ad-page)/weather/data/CityCountyData"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const query = searchParams.get("q") || ""
	const cities = CityCountyData.reduce<string[]>((acc, data) => {
		if (data.cityName.includes(query)) {
			acc.push(data.cityName)
		}
		return acc
	}, [])
	return Response.json({ cities })
}
