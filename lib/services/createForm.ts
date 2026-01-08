// services/activity.service.ts
import type { CreateActivityBodyDto } from "@/types/activities/activity.types"; 

export async function createFrom(
  teamId: string,
  body: CreateActivityBodyDto
) {
  const res = await fetch(`/${teamId}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include", // 인증 필요 시
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "체험 등록 실패");
  }

  return res.json();
}
