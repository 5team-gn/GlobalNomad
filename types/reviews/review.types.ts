export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "canceled"
  | "completed";

/**
 * 예약 카드 UI에서 사용하는 타입
 */
export interface ReservationView {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
  status: ReservationStatus;
  reviewWritten: boolean;
}
