import dayjs, { Dayjs } from "dayjs";

export const isPast = (startTime: Dayjs): Boolean => {
  return startTime.valueOf() < dayjs().valueOf();
};
