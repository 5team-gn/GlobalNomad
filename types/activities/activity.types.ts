export type ActivitySubImage = {
  id: number;
  imageUrl: string;
};
export type Activity = {
  id: number;
  subImages?: readonly ActivitySubImage[];
  bannerImageUrl: string;
  title: string;
};

export type ActivityHeaderInfoType = {
  id: number;
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
};
