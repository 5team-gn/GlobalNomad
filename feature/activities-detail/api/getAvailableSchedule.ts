/**
 *
 *
 * @description 액티비티 상세 - 예약 가능 일정 API 함수
 */

import { publicAxios } from "@/lib/api/axios";

export type AvailableTimeSlot = {
  id: number;
  startTime: string;
  endTime: string;
};

export type AvailableScheduleDay = {
  date: string;
  times: AvailableTimeSlot[];
};

export async function getAvailableSchedule(
  activityId: number,
  year: number,
  month: number
): Promise<AvailableScheduleDay[]> {
  try {
    const res = await publicAxios.get<AvailableScheduleDay[]>(
      `/activities/${activityId}/available-schedule`,
      {
        params: {
          year,
          month: String(month).padStart(2, "0"),
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("예약 가능 일정 조회 실패!:", error);
    throw error;
  }
}
