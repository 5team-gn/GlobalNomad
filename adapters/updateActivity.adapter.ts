import type { ActivityDetailResponse } from "@/types/activities/activity.types";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import type {
  UpdateMyActivityBodyDto,
  UpdateScheduleDto,
} from "@/types/updateActivity.types";

/**
 * ExperienceForm에서 넘어올 수 있는 원본 데이터 최소 형태
 * - ActivityDetailResponse / getActivityDetail() 결과 모두 커버
 */
type ActivityDetailLike = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages?: Array<{ id: number; imageUrl: string }>;
  schedules?: unknown;
};

type OriginalActivity = ActivityDetailResponse | ActivityDetailLike;

/**
 * 🟢 시간/날짜를 비교용 유니크 키로 변환
 */
const generateStrictKey = (
  date: string,
  start: string,
  end: string,
): string => {
  const d = date.split("T")[0].replace(/[^0-9]/g, ""); // 20260116
  const s = start
    .trim()
    .substring(0, 5)
    .replace(/[^0-9]/g, ""); // 1030
  const e = end
    .trim()
    .substring(0, 5)
    .replace(/[^0-9]/g, ""); // 1400
  return `${d}${s}${e}`;
};

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

/**
 * schedules 원본을 {id,date,startTime,endTime} 배열로 평탄화
 * - 형태 A: { date, times: [{id,startTime,endTime}] }
 * - 형태 B: { id, date, startTime, endTime }
 */
function flattenOriginalSchedules(
  schedules: unknown,
): Array<{ id: number; date: string; startTime: string; endTime: string }> {
  if (!Array.isArray(schedules)) return [];

  return schedules.flatMap((s) => {
    if (!isObject(s)) return [];

    // 형태 A
    if (typeof s.date === "string" && Array.isArray(s.times)) {
      return (s.times as unknown[]).flatMap((t) => {
        if (!isObject(t)) return [];
        if (typeof t.id !== "number") return [];
        if (typeof t.startTime !== "string" || typeof t.endTime !== "string")
          return [];

        return [
          {
            id: t.id,
            date: s.date as string,
            startTime: t.startTime as string,
            endTime: t.endTime as string,
          },
        ];
      });
    }

    // 형태 B
    if (
      typeof s.id === "number" &&
      typeof s.date === "string" &&
      typeof s.startTime === "string" &&
      typeof s.endTime === "string"
    ) {
      return [
        {
          id: s.id,
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        },
      ];
    }

    return [];
  });
}

export function mapFormToUpdateActivity(
  original: OriginalActivity,
  current: ExperienceFormValues,
): UpdateMyActivityBodyDto {
  // ✅ subImages가 undefined일 수도 있으니 안전 처리
  const originalSubImages = original.subImages ?? [];
  const currentSubUrls = current.subImageUrls ?? [];

  const currentUrlSet = new Set(currentSubUrls);
  const originalImageUrlSet = new Set(
    originalSubImages.map((img) => img.imageUrl),
  );

  const subImageIdsToRemove = originalSubImages
    .filter((img) => !currentUrlSet.has(img.imageUrl))
    .map((img) => img.id);

  const subImageUrlsToAdd = currentSubUrls.filter(
    (url) => !originalImageUrlSet.has(url),
  );

  // ✅ schedules도 unknown일 수 있으니 평탄화 유틸로 처리
  const originalSchedulesFlattened = flattenOriginalSchedules(
    original.schedules,
  );

  const originalKeySet = new Set(
    originalSchedulesFlattened.map((s) =>
      generateStrictKey(s.date, s.startTime, s.endTime),
    ),
  );

  const schedulesToAdd: UpdateScheduleDto[] = (current.schedules ?? [])
    .filter(
      (cs) =>
        !originalKeySet.has(
          generateStrictKey(cs.date, cs.startTime, cs.endTime),
        ),
    )
    .map(({ date, startTime, endTime }) => ({
      date: date.split("T")[0],
      startTime: startTime.substring(0, 5),
      endTime: endTime.substring(0, 5),
    }));

  const currentKeySet = new Set(
    (current.schedules ?? []).map((cs) =>
      generateStrictKey(cs.date, cs.startTime, cs.endTime),
    ),
  );

  const scheduleIdsToRemove = originalSchedulesFlattened
    .filter(
      (os) =>
        !currentKeySet.has(
          generateStrictKey(os.date, os.startTime, os.endTime),
        ),
    )
    .map((os) => os.id);

  // ✅ diff 생성
  const diff: Partial<UpdateMyActivityBodyDto> = {};

  if (current.title.trim() !== original.title)
    diff.title = current.title.trim();
  if (current.category !== original.category) diff.category = current.category;
  if (current.description !== original.description)
    diff.description = current.description;
  if (Number(current.price) !== original.price)
    diff.price = Number(current.price);
  if (current.address !== original.address) diff.address = current.address;
  if (current.bannerImageUrl !== original.bannerImageUrl)
    diff.bannerImageUrl = current.bannerImageUrl;

  if (subImageIdsToRemove.length > 0)
    diff.subImageIdsToRemove = subImageIdsToRemove;
  if (subImageUrlsToAdd.length > 0) diff.subImageUrlsToAdd = subImageUrlsToAdd;
  if (scheduleIdsToRemove.length > 0)
    diff.scheduleIdsToRemove = scheduleIdsToRemove;
  if (schedulesToAdd.length > 0) diff.schedulesToAdd = schedulesToAdd;

  return diff as UpdateMyActivityBodyDto;
}
