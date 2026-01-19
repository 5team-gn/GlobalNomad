import type { ReservationStatus } from "@/types/reservationview/reservationview.types";

export type StatusStyle = {
  badge: string;
  button: string;
  hover: string;
};

export const STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: "예약 완료",
  confirmed: "예약 승인",
  canceled: "예약 취소",
  declined: "예약 거절",
  completed: "체험 완료",
};

export const STATUS_STYLE: Record<ReservationStatus, StatusStyle> = {
  pending: {
    badge: "bg-green-100 text-green-500",
    button: "bg-green-100 text-green-500",
    hover: "hover:bg-green-500 hover:text-white",
  },
  confirmed: {
    badge: "bg-[#DDF9F9] text-[#1790A0]",
    button: "bg-[#DDF9F9] text-[#1790A0]",
    hover: "hover:bg-[#1790A0] hover:text-white",
  },
  canceled: {
    badge: "bg-gray-100 text-gray-600",
    button: "bg-gray-100 text-gray-600",
    hover: "hover:bg-gray-600 hover:text-white",
  },
  declined: {
    badge: "bg-[#FCECEA] text-[#F96767]",
    button: "bg-[#FCECEA] text-[#F96767]",
    hover: "hover:bg-[#F96767] hover:text-white",
  },
  completed: {
    badge: "bg-[#DAF0FF] text-[#0D6CD1]",
    button: "bg-[#F0F8FF] text-[#0D6CD1]",
    hover: "hover:bg-[#0D6CD1] hover:text-white",
  },
};
