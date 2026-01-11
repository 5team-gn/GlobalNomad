// services/activity.service.ts
import type { CreateActivityBodyDto } from "@/types/activities/activity.types"; 

const BASE_URL=process.env.NEXT_PUBLIC_API_BASE_URL;

export async function postcreateFrom(
  teamId: string,
  body: CreateActivityBodyDto
) {
  const res = await fetch(`${BASE_URL}/${teamId}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "체험 등록 실패");
  }

  return res.json();
}
