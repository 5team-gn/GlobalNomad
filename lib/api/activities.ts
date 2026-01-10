import axios from 'axios';
import type {
  ActivityListItem,
  ActivityListResponse,
  ActivityListParams,
} from '@/types/activities/activity.types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sp-globalnomad-api.vercel.app';
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || '19-6';

// CORS 에러 방지를 위해 withCredentials 제거
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/${TEAM_ID}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // CORS 에러 발생 - 주석 처리
});

/**
 * 체험 목록 조회 (페이지네이션)
 */
export const getActivities = async (
  params: ActivityListParams = {}
): Promise<ActivityListResponse> => {
  const { data } = await axiosInstance.get('/activities', {
    params: {
      method: 'offset',
      page: params.page || 1,
      size: params.size || 12,
      sort: params.sort || 'latest',
      category: params.category,
      keyword: params.keyword,
    },
  });
  return data;
};

/**
 * 인기 체험 조회 (무한 스크롤용 - 커서 기반)
 * @param cursorId - 커서 ID (선택)
 * @param size - 가져올 개수 (기본 8개)
 */
export const getPopularActivities = async (
  cursorId?: number,
  size: number = 8
): Promise<ActivityListResponse> => {
  const { data } = await axiosInstance.get('/activities', {
    params: {
      method: 'cursor',
      cursorId,
      size,
      sort: 'most_reviewed', // 
    },
  });
  return data;
};

/**
 * 특정 체험 상세 조회
 */
export const getActivityById = async (id: number): Promise<ActivityListItem> => {
  const { data } = await axiosInstance.get(`/activities/${id}`);
  return data;
};

/**
 * 카테고리별 체험 조회
 */
export const getActivitiesByCategory = async (
  category: string,
  page: number = 1,
  size: number = 12
): Promise<ActivityListResponse> => {
  const { data } = await axiosInstance.get('/activities', {
    params: {
      method: 'offset',
      category,
      page,
      size,
      sort: 'latest',
    },
  });
  return data;
};

/**
 * 검색어로 체험 검색
 */
export const searchActivities = async (
  keyword: string,
  page: number = 1,
  size: number = 12
): Promise<ActivityListResponse> => {
  const { data } = await axiosInstance.get('/activities', {
    params: {
      method: 'offset',
      keyword,
      page,
      size,
      sort: 'latest',
    },
  });
  return data;
};