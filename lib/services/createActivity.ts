//fetch 사용중 다른 호출 사용시 수정예정
import type { CreateActivityRequest, CreateActivityResponse } from "@/types/experience.api";

export async function createActivity(
  teamId: string,
  payload: CreateActivityRequest
): Promise<CreateActivityResponse> {
  const res = await fetch(`/${teamId}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "체험 등록 실패");
  }

  return res.json();
}
