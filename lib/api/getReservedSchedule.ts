
export interface ReservedScheduleResponse {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface ReservationDashboardResponse {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export interface ActivityReservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetReservationsResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: ActivityReservation[];
}

export const getReservedSchedule = async (
  activityId: number,
  date: string
): Promise<ReservedScheduleResponse[]> => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/my-activities/${activityId}/reserved-schedule?date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    }
  );

  if (!response.ok) throw new Error("스케줄 조회 실패");
  return response.json();
};

export const getReservationDashboard = async (
  activityId: number,
  year: string,
  month: string
): Promise<ReservationDashboardResponse[]> => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    }
  );

  if (!response.ok) throw new Error("월별 대시보드 조회 실패");
  return response.json();
};

export const getActivityReservations = async (
  activityId: number,
  scheduleId: number,
  status: string,
  size: number = 10
): Promise<GetReservationsResponse> => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/my-activities/${activityId}/reservations?scheduleId=${scheduleId}&status=${status}&size=${size}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    }
  );

  if (!response.ok) throw new Error("상세 명단 조회 실패");
  return response.json();
};

export const updateReservationStatus = async (
  activityId: number,
  reservationId: number,
  status: "confirmed" | "declined"
) => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/my-activities/${activityId}/reservations/${reservationId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "상태 업데이트 실패");
  }
  return response.json();
};