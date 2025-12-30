export type ReservationStatusLabel = "예약" | "승인" | "완료";

export interface ReservationBadge {
  status: ReservationStatusLabel;
  count: number;
}
