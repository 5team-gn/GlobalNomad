/**
 *
 *
 * @description 액티비티 상세 - 예약 생성
 */

import { authAxios } from "@/lib/api/axios";

export type CreateReservationRequest = {
  scheduleId: number;
  headCount: number;
};

export type CreateReservationResponse = {
  id?: number;
  status?: string;
};

export async function createReservation(
  activityId: number,
  payload: CreateReservationRequest
): Promise<CreateReservationResponse> {
  const res = await authAxios.post<CreateReservationResponse>(
    `/activities/${activityId}/reservations`,
    payload
  );
  return res.data;
}
