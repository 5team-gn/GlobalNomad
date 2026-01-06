import dayjs from "dayjs";

export function toDateKey(date: Date) {
  dayjs(date).format("YYYY-MM-DD")
}
