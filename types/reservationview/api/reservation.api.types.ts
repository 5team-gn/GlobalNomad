export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface ReservationApi {
  id: number;
  teamId: string;
  userId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
}

export interface ReservationListApiResponse {
  cursorId: number | null;
  reservations: ReservationApi[];
  totalCount: number;
}
