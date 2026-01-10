import instance from "./client";
import type {
  UserResponseDto,
  UpdateUserBodyDto,
} from "@/types/users/user.api.types";

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * 내 정보 조회
 */
export const getMyInfo = async (): Promise<UserResponseDto> => {
  const response = await instance.get<UserResponseDto>(`${TEAM_ID}/users/me`);
  return response.data;
};

/**
 * 내 정보 수정
 */
export const updateMyInfo = async (
  body: UpdateUserBodyDto
): Promise<UserResponseDto> => {
  const response = await instance.patch<UserResponseDto>(
    `${TEAM_ID}/users/me`,
    body
  );
  return response.data;
};

/**
 * 프로필 이미지 업로드 (이미지 URL 생성)
 */
export const uploadProfileImage = async (
  file: File
): Promise<{ profileImageUrl: string }> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await instance.post(`${TEAM_ID}/users/me/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
