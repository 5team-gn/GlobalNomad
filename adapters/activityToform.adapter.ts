import type { ActivityDetailResponse } from "@/types/activities/activity.types"; 
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";  

export function mapActivityToFormValues(
  api: ActivityDetailResponse
): ExperienceFormValues {
  return {
    title: api.title,
    category: api.category,
    description: api.description,
    price: api.price,
    address: api.address,

    bannerImageUrl: api.bannerImageUrl,
    subImageUrls: api.subImages?.map((img) => img.imageUrl) || [],

    schedules: (api.schedules || []).flatMap((schedule) =>
      (schedule.times || []).map((time) => ({
        date: schedule.date,
        startTime: time.startTime,
        endTime: time.endTime,
      }))
    ),
  };
}