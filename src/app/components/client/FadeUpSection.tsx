"use client"
import { useInView, animated } from "@react-spring/web"

export function FadeUpSection({
	children,
	customizeStyles,
}: {
	children: React.ReactNode
	customizeStyles?: React.CSSProperties
}) {
	const [ref, springs] = useInView(
		() => ({
			from: {
				opacity: 0,
				y: 200,
			},
			to: {
				opacity: 1,
				y: 0,
			},
		}),
		{
			rootMargin: "10px",
			once: true,
		},
	)

	return (
		<animated.section ref={ref} style={{ ...springs, ...customizeStyles }}>
			{children}
		</animated.section>
	)
}
