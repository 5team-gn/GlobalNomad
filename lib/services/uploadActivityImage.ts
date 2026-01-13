import { TEAM_ID } from "@/constants/env";

export async function uploadActivityImage(file: File): Promise<string> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("Missing API_BASE_URL");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (!token) throw new Error("로그인이 필요합니다.");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${base}/${TEAM_ID}/activities/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data: any = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message ?? `이미지 업로드 실패: ${res.status}`);
  }

  //응답 키 여러 케이스 대응
  const url =
    data?.imageUrl ??
    data?.url ??
    data?.activityImageUrl ??
    data?.image ??
    data?.data?.imageUrl ??
    data?.data?.url;

  if (!url || typeof url !== "string") {
    throw new Error("이미지 업로드 응답에서 URL을 찾지 못했습니다.");
  }

  return url;
}
