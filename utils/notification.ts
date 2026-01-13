/*
 ** 헤더 알람 사용중
 *
 */

export type NotiType = "APPROVED" | "REJECTED" | "UNKNOWN";

/**
 * 서버 응답에 type 필드가 없어 content 기반으로 승인/거절을 추론
 * - 추후 API에서 type을 내려주면 이 함수는 제거/대체 가능
 */
export function inferNotiType(content: string): NotiType {
  if (!content) return "UNKNOWN";
  if (content.includes("승인")) return "APPROVED";
  if (content.includes("거절")) return "REJECTED";
  return "UNKNOWN";
}

/**
 * ISO 시간을 상대시간으로 변환(표시용)
 * - 단순 UI 유틸이므로 외부 의존성 없이 유지
 */
export function timeAgo(iso: string) {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Date.now() - t;

  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}초 전`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}분 전`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;

  const day = Math.floor(hr / 24);
  return `${day}일 전`;
}

/** 타입별 타이틀 텍스트 */
export function getNotiTitle(type: NotiType) {
  if (type === "APPROVED") return "예약 승인";
  if (type === "REJECTED") return "예약 거절";
  return "알림";
}
