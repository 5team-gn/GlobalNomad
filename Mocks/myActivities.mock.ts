// 임시 데이터
import type { MyActivitiesResponse } from "@/types/MyExperienceTypes";

export const myActivitiesMock: MyActivitiesResponse = {
  cursorId: 3,
  totalCount: 3,
  activities: [
    {
      id: 1,
      userId: 10,
      title: "제주 바다 스노클링 체험",
      description: "맑은 제주 바다에서 즐기는 스노클링 체험입니다.",
      category: "액티비티",
      price: 35000,
      address: "제주특별자치도 서귀포시",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      rating: 4.8,
      reviewCount: 124,
      createdAt: "2025-12-01T09:12:00.000Z",
      updatedAt: "2025-12-01T09:12:00.000Z",
    },
    {
      id: 2,
      userId: 10,
      title: "서울 야경 사진 촬영 클래스",
      description: "전문가와 함께하는 서울 야경 촬영 클래스",
      category: "클래스",
      price: 50000,
      address: "서울특별시 중구",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1517816428104-7979a5f47f22",
      rating: 4.6,
      reviewCount: 89,
      createdAt: "2025-11-20T14:30:00.000Z",
      updatedAt: "2025-11-20T14:30:00.000Z",
    },
    {
      id: 3,
      userId: 10,
      title: "도심 요가 & 명상 원데이 클래스",
      description: "바쁜 일상 속 힐링을 위한 요가 클래스",
      category: "웰니스",
      price: 28000,
      address: "서울특별시 마포구",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1554311884-415bfda7c2a9",
      rating: 4.9,
      reviewCount: 42,
      createdAt: "2025-10-05T08:00:00.000Z",
      updatedAt: "2025-10-05T08:00:00.000Z",
    },
  ],
};
