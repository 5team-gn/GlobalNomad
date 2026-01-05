import { AvailableScheduleItem } from "@/types/reservation/types";

export const MOCK_AVAILABLE_SCHEDULE: AvailableScheduleItem[] = [
  {
    date: "2026-01-15",
    times: [
      { id: 1, startTime: "14:00", endTime: "15:00" },
      { id: 2, startTime: "15:00", endTime: "16:00" },
    ],
  },
  {
    date: "2026-01-22",
    times: [{ id: 3, startTime: "10:00", endTime: "11:30" }],
  },
  {
    date: "2026-02-02",
    times: [{ id: 4, startTime: "14:00", endTime: "19:30" }],
  },
];
