import { apiFetch } from "@/lib/api/apiFetch";

export type ActivityDetail = {
  id: number;
  title: string;
  description: string;
  address: string;
};

export function getActivityDetail(activityId: number) {
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
  if (!teamId) throw new Error("Missing TEAM_ID");

  return apiFetch<ActivityDetail>(`/${teamId}/activities/${activityId}`, {
    cache: "no-store",
  });
}
