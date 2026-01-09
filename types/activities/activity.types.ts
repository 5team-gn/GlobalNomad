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
