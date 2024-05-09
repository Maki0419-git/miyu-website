import dayjs, { Dayjs } from "dayjs"

export const isTomorrow = (startTime: Dayjs): Boolean => {
	const today = dayjs()
	const tomorrow = today.add(1, "day")

	return dayjs(startTime).isSame(tomorrow, "day")
}
