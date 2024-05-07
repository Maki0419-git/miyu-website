import dayjs from "dayjs";
import { SunriseSunsetTime } from "../types";

export function getIsDayOrNight(time: SunriseSunsetTime): "day" | "night" {
	const { Date: date, SunRiseTime: sunriseTime, SunSetTime: sunsetTime } = time;
	const nowInMilliseconds = dayjs().valueOf();
	const sunriseTimeInMilliseconds = dayjs(`${date} ${sunriseTime}`).valueOf();
	const sunsetTimeInMilliseconds = dayjs(`${date} ${sunsetTime}`).valueOf();
	return nowInMilliseconds >= sunriseTimeInMilliseconds && nowInMilliseconds <= sunsetTimeInMilliseconds
		? "day"
		: "night";
}
