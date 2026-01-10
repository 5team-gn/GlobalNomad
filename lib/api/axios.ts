import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_BASE_URL;
const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

const axiosInstance = axios.create({
  baseURL: `${base}/${teamId}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 공개 API용 Axios 인스턴스 (상세-캘린더용)
export const publicAxios = axios.create({
  baseURL: `${base}/${teamId}`,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터 (선택)
axiosInstance.interceptors.request.use(
  (config) => {
    // 예: 토큰 자동 첨부
    // const token = localStorage.getItem("accessToken");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (선택)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
