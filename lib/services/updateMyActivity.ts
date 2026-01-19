import { apiFetch } from "@/lib/api/apiFetch";

import type { ActivityDetailResponse } from "@/types/activities/activity.types";
import type { UpdateMyActivityBodyDto } from "@/types/updateActivity.types";

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID
export async function patchupdateMyActivity(
  activityId: number,
  body: UpdateMyActivityBodyDto
) {
  return apiFetch<ActivityDetailResponse>(
    `/${TEAM_ID}/my-activities/${activityId}`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
    }
  );
}