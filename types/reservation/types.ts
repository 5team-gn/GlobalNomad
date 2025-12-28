export type ReservationStep = "idle" | "date" | "time" | "people" | "done";

export type TimeSlot = {
  id: string;
  label: string; // "14:00~15:00"
};

export type ReservationSelection = {
  date: Date | null;
  timeSlot: TimeSlot | null;
  people: number;
};

export function formatDateKR(d: Date): string {
  // 22/11/14 형태
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}/${mm}/${dd}`;
}

export type AvailableScheduleItem = {
  date: string; // "YYYY-MM-DD"
  times: {
    id: number;
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
  }[];
};
