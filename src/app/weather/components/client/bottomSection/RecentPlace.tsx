"use client";
import { keyframes, styled } from "@pigment-css/react";
import { useEffect, useState, useTransition } from "react";
import { getCurrentWeather } from "../../../action";
import { CityCardType, getCityCardList } from "../../../utils/getCityCardList";
import WeatherAnimation from "./WeatherAnimation";
import { getWeatherType } from "../../../utils/getWeatherType";
import { WEATHER_DETAIL } from "../../../constant";
import { usePathname, useRouter } from "next/navigation";

const pulse = keyframes({
	"0%": { backgroundColor: "#eee" },
	"50%": { backgroundColor: "#f5f5f5" },
	"100%": { backgroundColor: "#eee" },
});

const Skeleton = styled("div")({
	backgroundColor: "#eee",
	animation: `${pulse} 1.5s infinite ease-in-out`,
	width: "100%",
	height: "100%",
});

const Container = styled("div")({
	width: "800px",
	display: "flex",
	height: "30vh",
	flexDirection: "column",
	padding: "0 20px",
	gap: "10px",
});

const CityCardContainer = styled("div")({
	display: "flex",
	height: "100%",
	justifyContent: "space-between",
	gap: "20px",
	overflowX: "auto",
	padding: "10px 0",
});

const CityCard = styled("div")<{ isSkeleton: Boolean }>({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: "10px",
	overflow: "hidden",
	width: "100%",
	height: "100%",
	minWidth: "150px",
	borderRadius: "8px",
	border: "1px solid #e2dfdf",
	backgroundPosition: "center",
	backgroundImage: (props) =>
		props.isSkeleton
			? "none"
			: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)),url('https://images.unsplash.com/photo-1574678863094-1cebd3031d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTIxODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTM2MjYxMTZ8&ixlib=rb-4.0.3&q=80&w=1080')",
	color: "white",
	cursor: "pointer",
	transition: "all 0.3s ease",
	"h2, h3, h4": {
		textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
	},
	"&:hover": {
		transform: "scale(1.05)",
	},
});

const CityCardSkeleton = () => (
	<CityCard isSkeleton={true}>
		<Skeleton />
	</CityCard>
);

type RecentPlaceProps = {
	recentPlace: string[];
};

export default function RecentPlace({ recentPlace }: RecentPlaceProps) {
	const [isPending, startTransition] = useTransition();
	const [cityCardList, setCityCardList] = useState<CityCardType[]>([]);
	const pathname = usePathname();
	const router = useRouter();

	const handleClick = (city: string) => {
		router.push(`${pathname}?city=${city}`);
	};

	useEffect(() => {
		startTransition(async () => {
			const data = await getCurrentWeather(recentPlace);
			const records = data.records;
			setCityCardList(getCityCardList(records, recentPlace));
			console.log({ data });
		});
	}, [recentPlace]);

	return (
		<Container>
			<h2>Recent Place</h2>
			<CityCardContainer>
				{cityCardList.map((city, index) =>
					isPending ? (
						<CityCardSkeleton key={city.cityName} />
					) : (
						<CityCard isSkeleton={false} key={city.cityName} onClick={() => handleClick(city.cityName)}>
							<h3>{city.cityName}</h3>
							<h2>{city.temperature}°C</h2>
							<h4>{city.weather}</h4>
							<WeatherAnimation weatherType={getWeatherType(WEATHER_DETAIL, city.weather)} />
						</CityCard>
					),
				)}
			</CityCardContainer>
		</Container>
	);
}
