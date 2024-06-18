"use client"

import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export function RouteButton({ children, src }: { children: React.ReactNode; src: string }) {
	const router = useRouter()

	useEffect(() => {
		router.prefetch(src)
	}, [router, src])
	return <button onClick={() => router.push(src)}>{children}</button>
}
