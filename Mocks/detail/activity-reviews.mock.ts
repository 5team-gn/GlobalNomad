import type { ReviewResponse } from "@/types/reviews/review.types";

export const mockActivityReviewsResponse: ReviewResponse = {
  averageRating: 4.3,
  totalCount: 6,
  reviews: [
    {
      id: 101,
      user: {
        profileImageUrl: "https://picsum.photos/seed/user101/80/80",
        nickname: "댄스초보",
        id: 9001,
      },
      activityId: 777,
      rating: 5,
      content:
        "처음인데도 동작을 단계별로 잘 풀어주셔서 부담이 없었어요. 분위기도 좋아서 시간 금방 갔습니다!",
      createdAt: "2025-12-10T12:20:00.000Z",
      updatedAt: "2025-12-10T12:20:00.000Z",
    },
    {
      id: 102,
      user: {
        profileImageUrl: "https://picsum.photos/seed/user102/80/80",
        nickname: "퇴근후한시간",
        id: 9002,
      },
      activityId: 777,
      rating: 4,
      content:
        "리듬감 없는 편인데도 따라가기 쉬웠어요. 마지막에 짧게 루틴 맞춰보는 게 재미있었습니다.",
      createdAt: "2025-12-11T09:05:00.000Z",
      updatedAt: "2025-12-11T09:05:00.000Z",
    },
    {
      id: 103,
      user: {
        profileImageUrl: "https://picsum.photos/seed/user103/80/80",
        nickname: "주말취미러",
        id: 9003,
      },
      activityId: 777,
      rating: 5,
      content:
        "음악 선곡이 좋고, 자세 교정도 꼼꼼합니다. 사진/영상 찍을 시간도 주셔서 만족!",
      createdAt: "2025-12-12T15:40:00.000Z",
      updatedAt: "2025-12-12T15:40:00.000Z",
    },
    {
      id: 104,
      user: {
        profileImageUrl: "https://picsum.photos/seed/user104/80/80",
        nickname: "몸치탈출",
        id: 9004,
      },
      activityId: 777,
      rating: 3,
      content:
        "난이도는 무난했는데 제가 체력이 부족해서 중간에 숨 찼네요. 그래도 친절해서 좋았습니다.",
      createdAt: "2025-12-13T18:12:00.000Z",
      updatedAt: "2025-12-13T18:12:00.000Z",
    },
    {
      id: 105,
      user: {
        profileImageUrl: "https://picsum.photos/seed/user105/80/80",
        nickname: "스트릿감성",
        id: 9005,
      },
      activityId: 777,
      rating: 4,
      content:
        "공간이 깔끔하고 미러/음향도 괜찮아요. 다음에는 다른 장르 클래스도 듣고 싶습니다.",
      createdAt: "2025-12-15T06:30:00.000Z",
      updatedAt: "2025-12-15T06:30:00.000Z",
    },
    {
      id: 106,
      user: {
        profileImageUrl: "https://picsum.photos/seed/user106/80/80",
        nickname: "리뷰요정",
        id: 9006,
      },
      activityId: 777,
      rating: 5,
      content:
        "설명→연습→피드백 흐름이 좋아요. 초보자 기준으로 포인트를 딱딱 집어줘서 확실히 배우는 느낌!",
      createdAt: "2025-12-18T10:01:00.000Z",
      updatedAt: "2025-12-18T10:01:00.000Z",
    },
  ],
};
