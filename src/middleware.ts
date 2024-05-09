import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
	const city = req.nextUrl.searchParams.get("city")
	if (city === null) return NextResponse.next()
	req.nextUrl.searchParams.set("city", decodeURIComponent(city))
	return NextResponse.next()
}

export const config = {
	matcher: "/weather/:path*",
}
