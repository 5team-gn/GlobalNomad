// lib/services/updateMyActivity.ts
import { authAxios } from "@/lib/api/axios";
import type { ActivityDetailResponse } from "@/types/activities/activity.types";
import { UpdateMyActivityBodyDto } from "@/types/updateActivity.types";

export async function patchupdateMyActivity(
  activityId: number,
  body: UpdateMyActivityBodyDto
) {
  const res = await authAxios.patch<ActivityDetailResponse>(
    `/my-activities/${activityId}`,
    body
  );
  return res.data;
}
