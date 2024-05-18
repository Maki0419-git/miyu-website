"use client" // Error components must be Client Components
import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		Sentry.captureException(error)
	}, [error])

	return (
		<div>
			<h2>{error.message}</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	)
}
