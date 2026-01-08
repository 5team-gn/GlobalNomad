import type { Reservation } from "../types/reservationview/reservationview.types";

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
