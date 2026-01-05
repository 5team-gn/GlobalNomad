import axios from "axios";
import type { Reservation } from "@/types/reservationview.types";
import { RESERVATION_MOCK_LIST } from "@/Mocks/ReservationView.mock";

/**
 * ⚠️ reservationApi
 *
 * 이 파일은 API 연동 브랜치(feat/reservation-api)에서 실제로 사용됩니다.
 * refactor/reservation-view 브랜치에서는
 * UI 구조 리팩토링을 위해 import / 호출하지 않습니다.
 */

// 기수-팀 형식 (예: 19-5)
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || "19-5";

// 🔹 mock 사용 여부
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
// 🔹 mock 에러 강제 발생 여부
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
    const testToken = "여기에-실제-토큰-붙여넣기";
    const token = localStorage.getItem("accessToken") || testToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("API Request:", `${config.baseURL ?? ""}${config.url ?? ""}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    return Promise.reject(error);
  }
);

/**
 * ================================
 * 0. 로그인
 * ================================
 */
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  if (USE_MOCK && MOCK_ERROR) {
    throw new Error("🧪 MOCK 로그인 실패");
  }

  const response = await apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);

  return response.data;
};

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
    if (MOCK_ERROR) {
      throw new Error("🧪 MOCK 예약 목록 조회 실패");
    }

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
    if (MOCK_ERROR) {
      throw new Error("🧪 MOCK 예약 취소 실패");
    }
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
  data: {
    rating: number;
    content: string;
  }
): Promise<void> => {
  if (USE_MOCK) {
    if (MOCK_ERROR) {
      throw new Error("🧪 MOCK 후기 작성 실패");
    }
    return;
  }

  await apiClient.post(`/my-reservations/${reservationId}/reviews`, data);
};

/**
 * ================================
 * 4. 예약 변경
 * ================================
 */
export const updateReservation = async (
  reservationId: number,
  data: {
    headCount?: number;
    scheduleId?: number;
  }
): Promise<void> => {
  if (USE_MOCK) {
    if (MOCK_ERROR) {
      throw new Error("🧪 MOCK 예약 변경 실패");
    }
    return;
  }

  await apiClient.patch(`/my-reservations/${reservationId}`, data);
};
