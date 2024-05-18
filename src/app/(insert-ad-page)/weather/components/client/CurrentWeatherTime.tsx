import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

export function CurrentWeatherTime({ dateTime }: { dateTime: string }) {
	const time = dayjs(dateTime).utcOffset(8).format("hh:mm A")

	return <h2>{time}</h2>
}
