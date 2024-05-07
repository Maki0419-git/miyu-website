"use client";

import dayjs from "dayjs";
import { WeatherAPIResponse, WeatherType } from "../../types";
import { WEATHER_ICON } from "../server/WeatherIcon";
import { getIsDayOrNight } from "../../utils/getIsDayOrNight";
import { getSunriseSunsetTime } from "../../action";
import useSWR from "swr";
import { keyframes, styled } from "@pigment-css/react";

const pulse = keyframes({
	"0%": { backgroundColor: "rgba(238, 238, 238, 0.3)" },
	"50%": { backgroundColor: "rgba(245, 245, 245, 0.3)" },
	"100%": { backgroundColor: "rgba(238, 238, 238, 0.3)" },
});

const Skeleton = styled("div")({
	backgroundColor: "rgba(238, 238, 238, 0.3)",
	animation: `${pulse} 0.2s infinite ease-in-out`,
	width: "80px",
	height: "80px",
	margin: "15px",
	borderRadius: "8px",
});

export function WeatherImage({
	weather,
	city,
	targetTime,
}: {
	weather: WeatherType;
	city: string;
	targetTime: string;
}) {
	const day = dayjs(targetTime).format("YYYY-MM-DD");
	const { data, isLoading, error } = useSWR<WeatherAPIResponse<"SUNRISE_SUNSET_TIME">>(
		["sunset-sunrise-time", city, day],
		() => getSunriseSunsetTime(city, day),
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	const sunriseSunsetTime = data?.records.locations.location[0].time[0];

	if (!sunriseSunsetTime || isLoading) return <Skeleton />;
	const isDayOrNight = getIsDayOrNight(dayjs(targetTime), sunriseSunsetTime);
	const weatherIcon = WEATHER_ICON[isDayOrNight][weather];

	return weatherIcon;
}
