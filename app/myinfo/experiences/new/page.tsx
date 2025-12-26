//체험 등록 페이지
"use client";

import ExperienceForm from "@/feature/Experience/ExperienceForm";
import { createActivity } from "@/lib/services/createActivity";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types"; 

export default function CreateExperiencePage() {
  const handleSubmit = async (values: ExperienceFormValues) => {
    try {
      await createActivity("teamId", {
        title: values.title,
        category: values.category,
        description: values.description,
        address: values.address,
        price: values.price,
        bannerImageUrl: values.bannerImageUrl,
        subImageUrls: values.subImageUrls,
        schedules: values.schedules,
      });

      alert("체험이 등록되었습니다!");
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <main className="max-w-160 mx-auto py-10">

      <ExperienceForm
        submitLabel="체험 등록하기"
        onSubmit={handleSubmit}
      />
    </main>
  );
}
