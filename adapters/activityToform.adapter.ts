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

    // 🔴 수정된 로직: api.schedules가 이미 {date, startTime, endTime}을 가지고 있습니다.
    schedules: (api.schedules || []).map((s) => ({
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
    })),
  };
}