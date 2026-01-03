export type CreateReservationBody = {
  scheduleId: number;
  headCount: number;
};

export const MOCK_CREATE_RESERVATION_BODY: CreateReservationBody = {
  scheduleId: 2,
  headCount: 10,
};

export const MOCK_RESERVATION_RESPONSE = {
  id: 1,
  teamId: "team_01",
  userId: 1,
  activityId: 1,
  scheduleId: 2,
  status: "pending",
  reviewSubmitted: false,
  totalPrice: 10000,
  headCount: 10,
  date: "2025-11-04",
  startTime: "15:00",
  endTime: "16:00",
  createdAt: "2025-12-24T08:38:28.312Z",
  updatedAt: "2025-12-24T08:38:28.312Z",
} as const;
