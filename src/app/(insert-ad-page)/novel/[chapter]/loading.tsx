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

const Container = styled("div")({
	padding: "20px 20px",
	width: "100%",
	display: "flex",
	gap: "20px",
	height: "1000px",
})

const SkeletonLeftSection = styled("div")({
	flex: 7,
	margin: "20px",
	borderRadius: "8px",
})

const SkeletonTitle = styled("h1")({
	width: "20%",
	height: "30px",
	margin: "8px 0px",
	borderRadius: "8px",
	animation: `${pulse} 2s infinite ease-in-out`,
})

const SkeletonContentContainer = styled("div")({
	width: "100%",
	height: "120px",
	margin: "30px 0px",
})

const SkeletonContent = styled("div")<{ width: number }>({
	width: (props) => props.width + "%",
	height: "25px",
	margin: "20px 0px",
	borderRadius: "8px",
	animation: `${pulse} 2s infinite ease-in-out`,
})

const SkeletonRightSection = styled("div")({
	flex: 3,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "10px",
	borderLeft: "1px solid #e2dfdf",
	height: "1000px",
	animation: `${pulse} 2s infinite ease-in-out`,
	borderRadius: "8px",
})

export default function Loading() {
	return (
		<Container>
			<SkeletonLeftSection>
				<SkeletonTitle />
				<SkeletonContentContainer>
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
					<SkeletonContent width={Math.random() * 100} />
				</SkeletonContentContainer>
			</SkeletonLeftSection>
			<SkeletonRightSection />
		</Container>
	)
}
