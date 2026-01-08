import type { ActivityDetailResponse } from "@/types/activities/activity.types";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import type {
  UpdateMyActivityBodyDto,
  UpdateScheduleDto,
} from "@/types/updateActivity.types";

const getScheduleKey = (schedule: {
  date: string;
  startTime: string;
  endTime: string;
}): string => `${schedule.date}|${schedule.startTime}|${schedule.endTime}`;

export function mapFormToUpdateActivity(
  original: ActivityDetailResponse,
  current: ExperienceFormValues,
): UpdateMyActivityBodyDto {
  const originalImageUrlSet = new Set(original.subImages.map((img) => img.imageUrl));
  const currentUrls = current.subImageUrls ?? [];
  const currentUrlSet = new Set(currentUrls);

  const subImageIdsToRemove = original.subImages
    .filter((img) => !currentUrlSet.has(img.imageUrl))
    .map((img) => img.id);

  const subImageUrlsToAdd = currentUrls.filter(
    (url) => !originalImageUrlSet.has(url),
  );

  const originalSchedules = original.schedules.flatMap((s) =>
    s.times.map((t) => ({
      id: t.id,
      date: s.date,
      startTime: t.startTime,
      endTime: t.endTime,
    })),
  );

  const originalScheduleMap = new Map(
    originalSchedules.map((s) => [getScheduleKey(s), s.id]),
  );
  const currentScheduleSet = new Set(current.schedules.map(getScheduleKey));

  const scheduleIdsToRemove = originalSchedules
    .filter((os) => !currentScheduleSet.has(getScheduleKey(os)))
    .map((os) => os.id);

  const schedulesToAdd: UpdateScheduleDto[] = current.schedules.filter(
    (cs) => !originalScheduleMap.has(getScheduleKey(cs)),
  );

  const diff: Partial<UpdateMyActivityBodyDto> = {};

  if (current.title !== original.title) diff.title = current.title;
  if (current.category !== original.category) diff.category = current.category;
  if (current.description !== original.description) diff.description = current.description;
  if (current.price !== original.price) diff.price = current.price;
  if (current.address !== original.address) diff.address = current.address;
  if (current.bannerImageUrl !== original.bannerImageUrl) diff.bannerImageUrl = current.bannerImageUrl;

  if (subImageIdsToRemove.length > 0) diff.subImageIdsToRemove = subImageIdsToRemove;
  if (subImageUrlsToAdd.length > 0) diff.subImageUrlsToAdd = subImageUrlsToAdd;
  if (scheduleIdsToRemove.length > 0) diff.scheduleIdsToRemove = scheduleIdsToRemove;
  if (schedulesToAdd.length > 0) diff.schedulesToAdd = schedulesToAdd;

  return diff;
}