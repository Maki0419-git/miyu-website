"use client";
import dayjs from "dayjs";

export function CurrentWeatherTime({ dateTime }: { dateTime: string }) {
	const time = dayjs(dateTime).format("hh:mm A");

	return <h2>{time}</h2>;
}
