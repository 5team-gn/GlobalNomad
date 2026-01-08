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
