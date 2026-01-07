import axios from "axios";
import type { Reservation } from "@/types/reservationview.types";
import { RESERVATION_MOCK_LIST } from "@/Mocks/ReservationView.mock";

/**
 * ⚠️ reservationApi
 *
 * feat/reservation-api 브랜치에서 실제 API 연동용
 * 로그인 API 연동 전까지는 accessToken 없으면 401 발생
 */

// 기수-팀 형식
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || "19-5";

// mock 제어
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
const MOCK_ERROR = process.env.NEXT_PUBLIC_MOCK_ERROR === "true";

const apiClient = axios.create({
  baseURL: `https://sp-globalnomad-api.vercel.app/${TEAM_ID}`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ================================
// 인터셉터
// ================================
apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("API Request:", `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    return Promise.reject(error);
  }
);

/**
 * ================================
 * 1. 예약 목록 조회
 * ================================
 */
export const fetchMyReservations = async (params?: {
  size?: number;
  cursorId?: number;
  status?: string;
}): Promise<Reservation[]> => {
  if (USE_MOCK) {
    if (MOCK_ERROR) throw new Error("🧪 MOCK 예약 목록 조회 실패");

    let data = RESERVATION_MOCK_LIST;
    if (params?.status) {
      data = data.filter((r) => r.status === params.status);
    }
    return data;
  }

  const response = await apiClient.get("/my-reservations", { params });

  if (Array.isArray(response.data)) return response.data;
  if (response.data?.reservations) return response.data.reservations;
  if (response.data?.data) return response.data.data;

  return [];
};

/**
 * ================================
 * 2. 예약 취소
 * ================================
 */
export const cancelReservation = async (
  reservationId: number
): Promise<void> => {
  if (USE_MOCK) {
    if (MOCK_ERROR) throw new Error("🧪 MOCK 예약 취소 실패");
    return;
  }

  await apiClient.patch(`/my-reservations/${reservationId}`, {
    status: "canceled",
  });
};

/**
 * ================================
 * 3. 후기 작성
 * ================================
 */
export const createReview = async (
  reservationId: number,
  data: { rating: number; content: string }
): Promise<void> => {
  if (USE_MOCK) {
    if (MOCK_ERROR) throw new Error("🧪 MOCK 후기 작성 실패");
    return;
  }

  await apiClient.post(`/my-reservations/${reservationId}/reviews`, data);
};
