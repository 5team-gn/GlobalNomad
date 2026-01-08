import type { ActivityDetailResponse } from "@/types/activities/activity.types";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import type {
  UpdateMyActivityBodyDto,
  UpdateScheduleDto,
} from "@/types/updateActivity.types";

export function mapFormToUpdateActivity(
  original: ActivityDetailResponse,
  current: ExperienceFormValues
): UpdateMyActivityBodyDto {
  const originalSubImages = original.subImages;
  const currentUrls = current.subImageUrls ?? [];

  const subImageIdsToRemove = originalSubImages
    .filter((img) => !currentUrls.includes(img.imageUrl))
    .map((img) => img.id);

  const subImageUrlsToAdd = currentUrls.filter(
    (url) => !originalSubImages.some((img) => img.imageUrl === url)
  );

  const originalSchedules = original.schedules.flatMap((s) =>
    s.times.map((t) => ({
      id: t.id,
      date: s.date,
      startTime: t.startTime,
      endTime: t.endTime,
    }))
  );

  const scheduleIdsToRemove = originalSchedules
    .filter(
      (os) =>
        !current.schedules.some(
          (cs) =>
            cs.date === os.date &&
            cs.startTime === os.startTime &&
            cs.endTime === os.endTime
        )
    )
    .map((os) => os.id);

  const schedulesToAdd: UpdateScheduleDto[] = current.schedules.filter(
    (cs) =>
      !originalSchedules.some(
        (os) =>
          os.date === cs.date &&
          os.startTime === cs.startTime &&
          os.endTime === cs.endTime
      )
  );

  return {
    title: current.title !== original.title ? current.title : undefined,
    category:
      current.category !== original.category ? current.category : undefined,
    description:
      current.description !== original.description
        ? current.description
        : undefined,
    price: current.price !== original.price ? current.price : undefined,
    address: current.address !== original.address ? current.address : undefined,
    bannerImageUrl:
      current.bannerImageUrl !== original.bannerImageUrl
        ? current.bannerImageUrl
        : undefined,

    subImageIdsToRemove: subImageIdsToRemove.length
      ? subImageIdsToRemove
      : undefined,
    subImageUrlsToAdd: subImageUrlsToAdd.length ? subImageUrlsToAdd : undefined,

    scheduleIdsToRemove: scheduleIdsToRemove.length
      ? scheduleIdsToRemove
      : undefined,
    schedulesToAdd: schedulesToAdd.length ? schedulesToAdd : undefined,
  };
}
