// feature/reservation/types/reservation.ts
export type ReservationStatusCode =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface Reservation {
  id: number | string;
  title: string;
  date: string; 
  price: number;
  people: number;
  status: ReservationStatusCode;
}
