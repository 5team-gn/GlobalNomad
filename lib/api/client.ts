import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

/**
 * 인증 토큰 처리
 * - 현재: testToken 사용
 * - TODO: 로그인 API 연동 후 accessToken으로 교체
 */
client.interceptors.request.use((config) => {
  const testToken = "TEST_TOKEN";
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken") || testToken
      : testToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
