import { Dayjs } from "dayjs"
import { SunriseSunsetTime } from "../types"

export function getIsDayOrNight(
	targetTime: string,
	generateDayjsInTaipei: (time: string) => Dayjs,
	sunriseSunsetTime: SunriseSunsetTime,
): "day" | "night" {
	const { Date: date, SunRiseTime: sunriseTime, SunSetTime: sunsetTime } = sunriseSunsetTime

	const targetTimeInMilliseconds = generateDayjsInTaipei(targetTime).valueOf()
	const sunriseTimeInMilliseconds = generateDayjsInTaipei(`${date} ${sunriseTime}`).valueOf()
	const sunsetTimeInMilliseconds = generateDayjsInTaipei(`${date} ${sunsetTime}`).valueOf()

	return targetTimeInMilliseconds >= sunriseTimeInMilliseconds && targetTimeInMilliseconds <= sunsetTimeInMilliseconds
		? "day"
		: "night"
}
