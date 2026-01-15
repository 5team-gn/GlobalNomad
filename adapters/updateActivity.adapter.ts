import type { ActivityDetailResponse } from "@/types/activities/activity.types";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import type { UpdateMyActivityBodyDto, UpdateScheduleDto } from "@/types/updateActivity.types";

/**
 * 🟢 시간/날짜를 숫자 형태의 유니크 키로 변환 (비교의 핵심)
 */
const generateStrictKey = (date: string, start: string, end: string): string => {
  const d = date.split('T')[0].replace(/[^0-9]/g, ""); // "20260116"
  const s = start.trim().substring(0, 5).replace(/[^0-9]/g, ""); // "1030"
  const e = end.trim().substring(0, 5).replace(/[^0-9]/g, "");   // "1400"
  return `${d}${s}${e}`;
};

export function mapFormToUpdateActivity(
  original: ActivityDetailResponse,
  current: ExperienceFormValues
): UpdateMyActivityBodyDto {
  
  // 1. 이미지 로직
  const originalSubImages = original.subImages || [];
  const currentUrlSet = new Set(current.subImageUrls || []);
  const originalImageUrlSet = new Set(originalSubImages.map((img) => img.imageUrl));

  const subImageIdsToRemove = originalSubImages
    .filter((img) => !currentUrlSet.has(img.imageUrl))
    .map((img) => img.id);
  const subImageUrlsToAdd = (current.subImageUrls || []).filter((url) => !originalImageUrlSet.has(url));

  // 2. 서버 데이터 평탄화 (어떤 구조든 대응 가능하도록 수정)
  const originalSchedulesFlattened = (original.schedules || []).flatMap((s: any) => {
    // 구조 A: s.times 내부에 배열이 있는 경우
    if (s.times && Array.isArray(s.times)) {
      return s.times.map((t: any) => ({
        id: t.id,
        date: s.date,
        startTime: t.startTime,
        endTime: t.endTime,
      }));
    }
    // 구조 B: s 자체가 타임 정보인 경우
    if (s.startTime && s.endTime) {
      return [{
        id: s.id,
        date: s.date,
        startTime: s.startTime,
        endTime: s.endTime,
      }];
    }
    return [];
  });

  // 3. 비교용 키셋 생성
  const originalKeySet = new Set(
    originalSchedulesFlattened.map((s) => generateStrictKey(s.date, s.startTime, s.endTime))
  );

  // 4. 추가/삭제 리스트 계산
  const schedulesToAdd: UpdateScheduleDto[] = (current.schedules || [])
    .filter((cs) => !originalKeySet.has(generateStrictKey(cs.date, cs.startTime, cs.endTime)))
    .map(({ date, startTime, endTime }) => ({
      date: date.split('T')[0],
      startTime: startTime.substring(0, 5),
      endTime: endTime.substring(0, 5),
    }));

  const currentKeySet = new Set(
    (current.schedules || []).map((cs) => generateStrictKey(cs.date, cs.startTime, cs.endTime))
  );

  const scheduleIdsToRemove = originalSchedulesFlattened
    .filter((os) => !currentKeySet.has(generateStrictKey(os.date, os.startTime, os.endTime)))
    .map((os) => os.id);

  // 5. 최종 차분(Diff) 결과 생성
  const diff: Partial<UpdateMyActivityBodyDto> = {};

  if (current.title.trim() !== original.title) diff.title = current.title.trim();
  if (current.category !== original.category) diff.category = current.category;
  if (current.description !== original.description) diff.description = current.description;
  if (Number(current.price) !== original.price) diff.price = Number(current.price);
  if (current.address !== original.address) diff.address = current.address;
  if (current.bannerImageUrl !== original.bannerImageUrl) diff.bannerImageUrl = current.bannerImageUrl;

  if (subImageIdsToRemove.length > 0) diff.subImageIdsToRemove = subImageIdsToRemove;
  if (subImageUrlsToAdd.length > 0) diff.subImageUrlsToAdd = subImageUrlsToAdd;
  if (scheduleIdsToRemove.length > 0) diff.scheduleIdsToRemove = scheduleIdsToRemove;
  if (schedulesToAdd.length > 0) diff.schedulesToAdd = schedulesToAdd;

  return diff as UpdateMyActivityBodyDto;
}