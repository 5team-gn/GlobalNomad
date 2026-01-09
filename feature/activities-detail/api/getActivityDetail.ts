import { apiFetch } from "@/lib/api/apiFetch";
import { TEAM_ID } from "@/constants/env";
import { ActivityDetailResponse } from "@/types/activities/activity.types";

export async function getActivityDetail(activityId: number) {
  return apiFetch<ActivityDetailResponse>(`/${TEAM_ID}/my-activities/${activityId}`, {
    cache: "no-store",
  });
}
