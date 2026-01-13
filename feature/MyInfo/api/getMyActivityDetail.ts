// feature/MyInfo/api/getMyActivityDetail.ts
import { apiFetch } from "@/lib/api/apiFetch";
import type { ActivityDetailResponse } from "@/types/activities/activity.types";

function getTeamId() {
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
  if (!teamId) throw new Error("팀아이디 없음");
  return teamId;
}

export async function getMyActivityDetail(activityId: number) {
  const teamId = getTeamId();
  return apiFetch<ActivityDetailResponse>(
    `/${teamId}/activities/${activityId}`,
    {
      cache: "no-store",
    }
  );
}
