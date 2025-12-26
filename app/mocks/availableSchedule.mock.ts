export type AvailableScheduleItem = {
  date: string; // "YYYY-MM-DD"
  times: {
    id: number;
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
  }[];
};

export const MOCK_AVAILABLE_SCHEDULE: AvailableScheduleItem[] = [
  {
    date: "2025-12-30",
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
