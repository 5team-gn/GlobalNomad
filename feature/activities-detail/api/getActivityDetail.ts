import { apiFetch } from "@/lib/api/apiFetch";
import { ActivityDetail } from "@/types/activities/activity.types";

function getTeamId() {
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
  if (!teamId) throw new Error("팀아이디 없음");
  return teamId;
}

export async function getActivityDetail(activityId: number) {
  const teamId = getTeamId();
  if (!teamId) throw new Error("팀아이디 없음");
  return apiFetch<ActivityDetail>(`/${teamId}/activities/${activityId}`, {
    cache: "no-store",
  });
}
