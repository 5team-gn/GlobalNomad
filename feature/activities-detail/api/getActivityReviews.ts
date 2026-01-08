/**
 *
 *
 * @description 액티비티 상세 - 리뷰 API 함수
 */

import { apiFetch } from "@/lib/api/apiFetch";
import type { ReviewResponse } from "@/types/reviews/review.types";

function getTeamId() {
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
  if (!teamId) throw new Error("Missing NEXT_PUBLIC_TEAM_ID");
  return teamId;
}

export async function getActivityReviews(
  activityId: number,
  page: number,
  size: number
): Promise<ReviewResponse> {
  const teamId = getTeamId();

  const qs = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  return apiFetch<ReviewResponse>(
    `/${teamId}/activities/${activityId}/reviews?${qs.toString()}`,
    { cache: "no-store" }
  );
}
