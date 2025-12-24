import type { ReviewResponse } from "@/types/reviews/review.types";

export async function getActivityReviews(
  activityId: number
): Promise<ReviewResponse> {
  // 실제 API 붙기 전에는 목업 반환
  const { mockActivityReviewsResponse } = await import(
    "@/app/mocks/activity-reviews.mock"
  );
  return mockActivityReviewsResponse;

  // 실제 API 예시(붙일 때)
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/activities/${activityId}/reviews`, {
  //   cache: "no-store",
  // });
  // if (!res.ok) throw new Error("Failed to fetch reviews");
  // return res.json();
}
