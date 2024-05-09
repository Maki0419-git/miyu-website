import dayjs, { Dayjs } from "dayjs"
import { SunriseSunsetTime } from "../types"

export function getIsDayOrNight(targetTime: Dayjs = dayjs(), sunriseSunsetTime: SunriseSunsetTime): "day" | "night" {
	const { Date: date, SunRiseTime: sunriseTime, SunSetTime: sunsetTime } = sunriseSunsetTime
	const targetTimeInMilliseconds = targetTime.valueOf()
	const sunriseTimeInMilliseconds = dayjs(`${date} ${sunriseTime}`).valueOf()
	const sunsetTimeInMilliseconds = dayjs(`${date} ${sunsetTime}`).valueOf()
	return targetTimeInMilliseconds >= sunriseTimeInMilliseconds && targetTimeInMilliseconds <= sunsetTimeInMilliseconds
		? "day"
		: "night"
}
