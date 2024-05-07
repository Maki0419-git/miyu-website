import dayjs from "./dayjs";
export const isTomorrow = (startTime: string): Boolean => {
	const today = dayjs();
	const tomorrow = today.add(1, "day");

	return dayjs(startTime).isSame(tomorrow, "day");
};
