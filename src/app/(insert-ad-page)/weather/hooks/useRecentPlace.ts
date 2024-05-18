"use client"

import { LRUArray } from "@/utils/getLRUArray"
import { LocalStorage } from "@/utils/localStorage"
import { useEffect, useState } from "react"

type RecentPlace = string[]
const recentPlaceStorage = new LocalStorage<RecentPlace>("recentPlace", ["臺中市", "高雄市", "宜蘭縣"])

export default function useRecentPlace() {
	const [recentPlace, setRecentPlace] = useState<RecentPlace>([])

	const handlePlaceChange = (place: string) => {
		const newStorage = LRUArray(recentPlace, place, 3)
		setRecentPlace(newStorage)
		recentPlaceStorage.set(newStorage)
	}

	useEffect(() => {
		setRecentPlace(recentPlaceStorage.get())
	}, [])

	return { recentPlace, handlePlaceChange }
}
