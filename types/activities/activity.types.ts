export type Activity = {
  subImages?: readonly { imageUrl: string }[];
  bannerImageUrl: string;
  title: string;
};

export type ActivityHeaderInfoMock = {
  id: number;
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
};
