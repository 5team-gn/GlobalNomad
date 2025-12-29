import { AvailableScheduleItem } from "@/types/reservation/types";

export const MOCK_AVAILABLE_SCHEDULE: AvailableScheduleItem[] = [
  {
    date: "2025-12-31",
    times: [
      { id: 1, startTime: "14:00", endTime: "15:00" },
      { id: 2, startTime: "15:00", endTime: "16:00" },
    ],
  },
  {
    date: "2026-01-05",
    times: [{ id: 3, startTime: "10:00", endTime: "11:30" }],
  },
];
