import type { Reservation } from "../types/reservationview/reservationview.types";
// 임시 데이터
import type { MyActivitiesResponse } from "@/types/MyExperienceTypes";
// TODO: API 연동 시 삭제
export const RESERVATION_MOCK_LIST: Reservation[] = [
  {
    id: 1,
    title: "함께 배우는 플로잉 댄스",
    date: "2023.02.14 · 11:00 - 12:30",
    price: 10000,
    people: 1,
    status: "pending",
  },
  {
    id: 2,
    title: "내 강아지 인생 사진 찍어주기",
    date: "2023.02.11 · 13:00 - 14:00",
    price: 35000,
    people: 1,
    status: "canceled",
  },
  {
    id: 3,
    title: "이색 액티비티 체험",
    date: "2023.01.10 · 10:00 - 12:00",
    price: 60000,
    people: 3,
    status: "declined",
  },
  {
    id: 4,
    title: "별과 함께하는 북촌 체험",
    date: "2023.01.14 · 15:00 - 16:00",
    price: 40000,
    people: 2,
    status: "completed",
    reviewWritten: true,
  },
  {
    id: 5,
    title: "요리 클래스 체험",
    date: "2023.09.20 · 09:00 - 10:30",
    price: 25000,
    people: 1,
    status: "completed",
    reviewWritten: false,
  },
  {
    id: 6,
    title: "여행 클래스 체험",
    date: "2023.11.20 · 09:00 - 10:30",
    price: 37000,
    people: 1,
    status: "confirmed",
  },
];
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
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
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
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
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
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
      rating: 4.9,
      reviewCount: 42,
      createdAt: "2025-10-05T08:00:00.000Z",
      updatedAt: "2025-10-05T08:00:00.000Z",
    },
  ],
};
