import { keyframes, styled } from "@pigment-css/react"

const pulse = keyframes`
    0% {
        background-color: #d5d5d5;
    }
    50% {
        background-color: #f0f0f0;
    }
    100% {
        background-color: #d5d5d5;
    }
`

const bgPluse = keyframes`
	0% {
		background-color: #eaeaea;
	}
	50% {
		background-color: #fbfbfb;
	}
	100% {
		background-color: #eaeaea;
	}
`

const SkeletonCard = styled("div")({
	width: "100%",
	padding: "10px 15px",
	boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
	borderRadius: "8px",
	marginBottom: "16px",
	animation: `${bgPluse} 2s infinite ease-in-out`,
})

const SkeletonTitle = styled("div")({
	width: "100%",
	height: "20px",
	marginBottom: "8px",
	animation: `${pulse} 2s infinite ease-in-out`,
})

const SkeletonContent = styled("div")({
	width: "100%",
	height: "120px",
	animation: `${pulse} 2s infinite ease-in-out`,
})

export function Skeleton() {
	return (
		<SkeletonCard>
			<SkeletonTitle />
			<SkeletonContent />
		</SkeletonCard>
	)
}
