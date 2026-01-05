export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export type Reservation = {
  id: number;
  title: string;
  date: string;
  price: number;
  people: number;
  status: ReservationStatus;
};
