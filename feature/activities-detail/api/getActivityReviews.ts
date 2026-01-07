/**
 *
 *
 * @description 액티비티 상세 - 리뷰 API 함수
 */

import type { ReviewResponse } from "@/types/reviews/review.types";

export async function getActivityReviews(
  activityId: number,
  page: number,
  size: number
): Promise<ReviewResponse> {
  const res = await fetch(
    `/api/activities/${activityId}/reviews?page=${page}&size=${size}`
  );
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}
