"use client"

import { useRouter } from "next/navigation"
import React from "react"

export function RouteButton({ children, src }: { children: React.ReactNode; src: string }) {
	const router = useRouter()
	return <button onClick={() => router.push(src)}>{children}</button>
}
