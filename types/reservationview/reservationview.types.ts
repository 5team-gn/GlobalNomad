/** 예약 상태 (전역 공통) */
export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

/** 서버에서 내려오는 예약 원본 */
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

/** 예약 리스트 API 응답 */
export interface ReservationListApiResponse {
  cursorId: number | null;
  reservations: ReservationApi[];
  totalCount: number;
}

/** UI에서 사용하는 예약 카드 타입 */
export interface Reservation {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  people: number;
  status: ReservationStatus;
  reviewWritten?: boolean;
}
