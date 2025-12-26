
export interface ActivityScheduleTime {
  startTime: string; 
  endTime: string;   
}

export interface ActivitySchedule {
  date: string; 
  times: ActivityScheduleTime[];
}

export interface CreateActivityRequest {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  bannerImageUrl: string;
  subImageUrls: string[];
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}
export interface CreateActivityResponse {
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
