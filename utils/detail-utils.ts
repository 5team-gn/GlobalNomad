//연/월/일 (상세-리뷰)
export function formatKoreanDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

//평점에 따른 만족도(상세-만족도)
export function getSatisfactionLabel(avg: number) {
  if (avg >= 4.5) return "매우 만족";
  if (avg >= 4.0) return "만족";
  if (avg >= 3.0) return "보통";
  if (avg > 0) return "아쉬움";
  return "후기 없음";
}
