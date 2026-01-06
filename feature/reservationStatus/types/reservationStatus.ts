export type ReservationStatusCode =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export type ReservationStatusLabel = "신청" | "승인" | "거절" | "취소" | "완료";

export const RESERVATION_STATUS_LABEL: Record<
  ReservationStatusCode,
  ReservationStatusLabel
> = {
  pending: "신청",
  confirmed: "승인",
  declined: "거절",
  canceled: "취소",
  completed: "완료",
};

export interface ReservationBadge {
  id: string;
  status: ReservationStatusCode;
  count: number;
}
