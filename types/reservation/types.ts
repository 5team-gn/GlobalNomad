export type ReservationStep = "idle" | "date" | "time" | "people" | "done";

export type TimeSlot = {
  id: number;
  label: string; // "14:00~15:00"
};

export type ReservationSelection = {
  date: Date | null;
  timeSlot: TimeSlot | null;
  people: number;
};

export type AvailableScheduleItem = {
  date: string; // "YYYY-MM-DD"
  times: {
    id: number;
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
  }[];
};
