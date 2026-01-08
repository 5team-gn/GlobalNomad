import { ReservationStatusCode } from "../types/reservation";

export const TIME_SLOTS = [
  "전체",
  ...Array.from({ length: 24 }, (_, i) => {
    const start = String(i).padStart(2, "0") + ":00";
    const end = String(i + 1).padStart(2, "0") + ":00";
    return `${start} - ${end}`;
  }),
];

export const TABS: { label: string; status: ReservationStatusCode }[] = [
  { label: "신청", status: "pending" },
  { label: "승인", status: "confirmed" },
  { label: "거절", status: "declined" },
];

export const STATUS_UI_CONFIG: Record<
  ReservationStatusCode,
  { label: string; badgeStyle: string }
> = {
  pending: {
    label: "신청",
    badgeStyle: "bg-blue-50 text-blue-600 border-blue-100",
  },
  confirmed: {
    label: "예약 승인",
    badgeStyle: "bg-cyan-50 text-cyan-500 border-cyan-100",
  },
  declined: {
    label: "예약 거절",
    badgeStyle: "bg-red-50 text-red-400 border-red-100",
  },
  canceled: {
    label: "예약 취소",
    badgeStyle: "bg-gray-100 text-gray-500 border-gray-200",
  },
  completed: {
    label: "방문 완료",
    badgeStyle: "bg-blue-50 text-blue-600 border-blue-100",
  },
} as const;
