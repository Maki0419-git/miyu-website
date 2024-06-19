"use client"
import { useInView, animated } from "@react-spring/web"
export function FadeUpSection({ children }: { children: React.ReactNode }) {
	const [ref, springs] = useInView(
		() => ({
			from: {
				opacity: 0,
				y: 100,
			},
			to: {
				opacity: 1,
				y: 0,
			},
		}),
		{
			amount: 0.2,
			once: true,
		},
	)

	return (
		<animated.section ref={ref} style={springs}>
			{children}
		</animated.section>
	)
}
