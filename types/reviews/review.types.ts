import type { ReservationStatus } from "@/types/reservationview/reservationview.types";

export interface ReviewUser {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface Review {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
  status: ReservationStatus;
  reviewWritten: boolean;
}
