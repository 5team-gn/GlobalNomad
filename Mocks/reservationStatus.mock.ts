import { Reservation } from "@/feature/reservationStatus/types/reservation"; 

export const mockReservations: Reservation[] = [
  {
    id: "선기훈",
    title: "함께 배우는 플로잉 댄스",
    date: "2025-12-01T11:00:00",
    price: 10000,
    people: 1,
    status: "pending",
  },
  {
    id: "정만철",
    title: "함께 배우는 플로잉 댄스",
    date: "2025-02-01T18:00:00",
    price: 10000,
    people: 1,
    status: "pending",
  },
  {
    id: "오승환",
    title: "내 강아지 인생 사진 찍어주기",
    date: "2026-02-11T13:00:00",
    price: 35000,
    people: 1,
    status: "canceled",
  },
  {
    id: "이대호",
    title: "이색 액티비티 체험",
    date: "2026-01-10T10:00:00",
    price: 60000,
    people: 3,
    status: "declined",
  },
  {
    id: "양의지",
    title: "별과 함께하는 북촌 체험",
    date: "2026-01-14T15:00:00",
    price: 40000,
    people: 2,
    status: "completed",
  },
];
