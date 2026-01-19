import type { ActivityDetailResponse } from "@/types/activities/activity.types";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";

/**
 * getActivityDetail(ActivityDetail)이 반환하는 schedules 형태도 섞여있어서
 * "들어올 수 있는 schedules"를 unknown으로 받고 런타임에서 판별 후 normalize
 */

// 폼이 원하는 스케줄 형태
type FormSchedule = { date: string; startTime: string; endTime: string };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isScheduleWithTimes(
  s: unknown,
): s is {
  date: string;
  times: { startTime: string; endTime: string; id: number }[];
} {
  if (!isObject(s)) return false;
  if (typeof s.date !== "string") return false;
  if (!Array.isArray(s.times)) return false;

  return s.times.every((t) => {
    if (!isObject(t)) return false;
    return typeof t.startTime === "string" && typeof t.endTime === "string";
  });
}

function isScheduleFlat(
  s: unknown,
): s is { date: string; startTime: string; endTime: string; id?: number } {
  if (!isObject(s)) return false;
  return (
    typeof s.date === "string" &&
    typeof s.startTime === "string" &&
    typeof s.endTime === "string"
  );
}

function normalizeSchedules(schedules: unknown): FormSchedule[] {
  if (!Array.isArray(schedules)) return [];

  return schedules.flatMap((s): FormSchedule[] => {
    if (isScheduleWithTimes(s)) {
      return (s.times ?? []).map((t) => ({
        date: s.date,
        startTime: t.startTime,
        endTime: t.endTime,
      }));
    }

    if (isScheduleFlat(s)) {
      return [
        {
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        },
      ];
    }

    return [];
  });
}

type ActivityLike = {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages?: Array<{ imageUrl: string }>;
  schedules?: unknown;
};

export function mapActivityToFormValues(
  api: ActivityDetailResponse | ActivityLike,
): ExperienceFormValues {
  return {
    title: api.title,
    category: api.category,
    description: api.description,
    price: api.price,
    address: api.address,

    bannerImageUrl: api.bannerImageUrl,
    subImageUrls: api.subImages?.map((img) => img.imageUrl) || [],

    schedules: normalizeSchedules(api.schedules),
  };
}
