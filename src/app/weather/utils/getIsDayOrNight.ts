import { SunriseSunsetTime } from "../types";
import dayjs from "./dayjs";

export function getIsDayOrNight(time: SunriseSunsetTime): "day" | "night" {
	const { Date: date, SunRiseTime: sunriseTime, SunSetTime: sunsetTime } = time;
	const nowInMilliseconds = dayjs().valueOf();
	const sunriseTimeInMilliseconds = dayjs(`${date} ${sunriseTime}`).valueOf();
	const sunsetTimeInMilliseconds = dayjs(`${date} ${sunsetTime}`).valueOf();
	return nowInMilliseconds >= sunriseTimeInMilliseconds && nowInMilliseconds <= sunsetTimeInMilliseconds
		? "day"
		: "night";
}
