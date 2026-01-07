import { apiFetch } from "@/lib/api/apiFetch";
import type { ActivityDetail } from "@/types/activities/activity.types";
import type { ReviewResponse } from "@/types/reviews/review.types";

//팀아이디 가져오기
function getTeamId() {
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
  if (!teamId) throw new Error("Missing NEXT_PUBLIC_TEAM_ID");
  return teamId;
}

//상세 정보
export async function getActivityDetail(activityId: number) {
  const teamId = getTeamId();
  return apiFetch<ActivityDetail>(`/${teamId}/activities/${activityId}`, {
    cache: "no-store",
  });
}

//리뷰 리스트
export async function getActivityReviews(
  activityId: number,
  page: number = 1,
  size: number = 1 //테스트후 3개로 수정해야함
): Promise<ReviewResponse> {
  const teamId = getTeamId();

  const qs = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  return apiFetch<ReviewResponse>(
    `/${teamId}/activities/${activityId}/reviews?${qs}`,
    {
      cache: "no-store",
    }
  );
}
