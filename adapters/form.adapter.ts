import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import type { CreateActivityBodyDto } from "@/types/activities/activity.types"; 

export function mapFormToCreateActivity(
  form: ExperienceFormValues
): CreateActivityBodyDto {
  return {
    title: form.title,
    category: form.category,
    description: form.description,
    price: form.price,
    address: form.address,
    schedules: form.schedules.map((s) => ({
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
    })),
    bannerImageUrl: form.bannerImageUrl,
    subImageUrls: form.subImageUrls,
  };
}