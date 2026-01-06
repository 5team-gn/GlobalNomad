import dayjs from "dayjs";

export function toDateKey(date: Date) {
 return dayjs(date).format("YYYY-MM-DD")

}
