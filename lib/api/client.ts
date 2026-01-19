import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://sp-globalnomad-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 인증 토큰 처리
 * - accessToken이 있을 때만 Authorization 헤더 설정
 * - 토큰이 없으면 인증 헤더 없이 요청 (서버에서 401 처리)
 */
client.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

/**
 * 401 인증 에러 처리
 * - TODO: 로그인 연동 후 로그인 페이지 redirect
 */
client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("인증 필요 (로그인 연동 대기 중)");
    }
    return Promise.reject(error);
  }
);

export default client;
