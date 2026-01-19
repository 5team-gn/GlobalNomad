import {
  ReservationStatusCode,
  RESERVATION_STATUS_LABEL,
} from "@/feature/reservationStatus/types/reservationStatus";

interface StatusBadgeProps {
  status: ReservationStatusCode;
  count: number;
}

const STYLE_MAP: Record<ReservationStatusCode, string> = {
  pending: "bg-blue-50 text-blue-500",
  confirmed: "bg-orange-50 text-orange-500",
  declined: "bg-red-50 text-red-500",
  canceled: "bg-gray-100 text-gray-400",
  completed: "bg-gray-100 text-gray-500",
};

export function StatusBadge({ status, count }: StatusBadgeProps) {
  return (
    <div
      className={`rounded-md px-2.5 py-0.5 text-14-m ${STYLE_MAP[status]}`}
    >
      {RESERVATION_STATUS_LABEL[status]} {count}
    </div>
  );
}
