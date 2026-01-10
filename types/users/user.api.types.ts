/** 내 정보 조회 / 수정 공통 응답 */
export interface UserResponseDto {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/** 내 정보 수정 요청 바디 */
export interface UpdateUserBodyDto {
  nickname?: string;
  profileImageUrl?: string | null;
}
