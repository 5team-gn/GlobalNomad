export const mockActivityDetail = {
  id: 7,
  userId: 21,
  title: "함께 배우면 즐거운 스트릿댄스",
  description: "둠칫 둠칫 두둠칫",
  category: "투어",
  price: 10000,
  address: "서울특별시 강남구 테헤란로 427",
  bannerImageUrl: "/mock/mock1.png",
  subImages: [
    {
      id: 1,
      imageUrl: "/mock/mock2.png",
    },
    {
      id: 2,
      imageUrl: "/mock/mock3.png",
    },
    {
      id: 3,
      imageUrl: "/mock/mock4.png",
    },
    {
      id: 4,
      imageUrl: "/mock/mock5.png",
    },
  ],
  schedules: [
    { id: 1, date: "2026-01-01", startTime: "12:00", endTime: "13:00" },
    { id: 2, date: "2026-01-05", startTime: "12:00", endTime: "13:00" },
  ],
  subImageUrls: [
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png",
  ],
  reviewCount: 5,
  rating: 4.74,
  createdAt: "2026-01-10T21:28:50.589Z",
  updatedAt: "2026-01-10T21:28:50.589Z",
} as const;
