<<<<<<< HEAD
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const base = process.env.NEXT_PUBLIC_API_BASE_URL;
const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

const axiosInstance = axios.create({
  baseURL: `${base}/${teamId}`,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 공개 API용 Axios 인스턴스 (상세-캘린더용)
export const publicAxios = axios.create({
  baseURL: `${base}/${teamId}`,
});

// 인증 필요한 요청은 이것만 사용- *다른 팀원과 공유될수있어 새로 추가함
export const authAxios = axios.create({
  baseURL: `${base}/${teamId}`,
});

// 요청 인터셉터 (선택)
axiosInstance.interceptors.request.use(
  (config) => {
    // 예: 토큰 자동 첨부
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
=======
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 요청 인터셉터 (선택)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // 예: 토큰 자동 첨부
//     // const token = localStorage.getItem("accessToken");
//     // if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
>>>>>>> origin/main

// // 응답 인터셉터 (선택)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

<<<<<<< HEAD
/*
 *토큰 갱신 로직 포함한 인증 인터셉터
 * 아래는 상세페이지에서 현재 사용중
 * 필요시 사용할수있으며 필요시 수정하게될시 수정내용 공유 필수
 */
let refreshing: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("리프레시 토큰이 없습니다.");

  const res = await publicAxios.post("/auth/tokens", { refreshToken });

  const newAccessToken = res.data?.accessToken as string | undefined;
  const newRefreshToken = res.data?.refreshToken as string | undefined;

  if (!newAccessToken) throw new Error("토큰을 새로 갱신할 수 없습니다.");

  localStorage.setItem("accessToken", newAccessToken);
  if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

  return newAccessToken;
}

authAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (status !== 401 || !original) return Promise.reject(error);
    if (original._retry) return Promise.reject(error);
    if (original.url?.includes("/auth/tokens")) return Promise.reject(error);

    original._retry = true;

    try {
      refreshing = refreshing ?? refreshAccessToken();
      const newToken = await refreshing;
      refreshing = null;

      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newToken}`;

      return authAxios(original);
    } catch (e) {
      refreshing = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
=======
// export default axiosInstance;
>>>>>>> origin/main
