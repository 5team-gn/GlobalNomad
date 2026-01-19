import client from "./client";
import {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  SignupResponse,
} from "@/types/auth/auth.types";

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || "19-5";

/**
 * 로그인
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await client.post<AuthResponse>(
    `/${TEAM_ID}/auth/login`,
    data
  );
  return response.data;
};

/**
 * 회원가입
 */
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await client.post<SignupResponse>(
    `/${TEAM_ID}/users`,
    data
  );
  return response.data;
};

/**
 * 토큰 재발급
 */
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
    // 헤더에 Authorization: Bearer {refreshToken} 형식으로 보냄
    const response = await client.post<AuthResponse>(
        `/${TEAM_ID}/auth/tokens`,
        {},
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        }
    );
    return response.data;
};
