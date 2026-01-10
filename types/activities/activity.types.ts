export type ActivitySubImage = {
  id: number;
  imageUrl: string;
};

export type Activity = {
  id: number;
  title: string;
  bannerImageUrl: string;
  subImages?: readonly ActivitySubImage[];
};

export type ActivityHeaderInfoType = {
  id: number;
  userId: number;
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
};

export type ActivitySchedule = {
  id: number;
  date: string | null;
  startTime: string;
  endTime: string;
};

export type ActivityDetail = Activity &
  ActivityHeaderInfoType & {
    userId: number;
    description: string;
    price: number;
    schedules: ActivitySchedule[];
    createdAt: string;
    updatedAt: string;
    subImages: ActivitySubImage[];
  };

export interface CreateActivityScheduleDto {
  date: string; 
  startTime: string; 
  endTime: string; 
}

export interface CreateActivityBodyDto {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedules: CreateActivityScheduleDto[];
  bannerImageUrl: string;
  subImageUrls?: string[];
}

export interface ActivityDetailResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: { imageUrl: string; id: number }[];
  schedules: {
    date: string;
    times: {
      startTime: string;
      endTime: string;
      id: number;
    }[];
  }[];
}

// ===== API 요청/응답 타입 =====

export interface CreateActivityScheduleDto {
  date: string;
  startTime: string;
  endTime: string;
}

export interface CreateActivityBodyDto {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedules: CreateActivityScheduleDto[];
  bannerImageUrl: string;
  subImageUrls?: string[];
}

export interface ActivityDetailResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: { imageUrl: string; id: number }[];
  schedules: {
    date: string;
    times: {
      startTime: string;
      endTime: string;
      id: number;
    }[];
  }[];
}

// ===== 체험 목록 관련 타입 (EXPORT 추가) =====

/**
 * 체험 목록 아이템 타입
 */
export interface ActivityListItem {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 체험 목록 응답 타입
 */
export interface ActivityListResponse {
  cursorId: number | null;
  totalCount: number;
  activities: ActivityListItem[];
}

/**
 * 체험 목록 조회 파라미터
 */
export interface ActivityListParams {
  method?: 'offset' | 'cursor';
  cursorId?: number;
  category?: string;
  keyword?: string;
  sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
  page?: number;
  size?: number;
}

/**
 * 카테고리 타입
 */
export type CategoryType =
  | '문화·예술'
  | '식음료'
  | '스포츠'
  | '투어'
  | '관광'
  | '웰빙';






