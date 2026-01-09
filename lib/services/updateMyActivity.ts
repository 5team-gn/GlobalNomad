import type { UpdateMyActivityBodyDto } from "@/types/updateActivity.types";

export async function patchupdateMyActivity(
  teamId: string,
  activityId: number,
  body: UpdateMyActivityBodyDto
) {
  const res = await fetch(
    `/${teamId}/my-activities/${activityId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "체험 수정 실패");
  }

  return res.json();
}