// 체험 수정 페이지
// app/myinfo/experiences/[id]/edit/page.tsx
"use client";

import ExperienceForm from "@/feature/Experience/ExperienceForm";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";

// 임시 데이터: 나중에 실제 API에서 받아온 데이터를 초기값으로 넣을 수 있음
const initialValues: Partial<ExperienceFormValues> = {
  title: "임시 체험 제목",
  description: "임시 설명",
  category: "투어",
  price: 10000,
  address: "서울특별시 강남구 테헤란로 427",
  bannerImageUrl: "",
  schedules: [],
  subImageUrls: [],
};

export default function EditExperiencePage() {
  const handleSubmit = (values: ExperienceFormValues) => {
    console.log("체험 수정 데이터:", values);
    // TODO: 실제 API 호출로 수정 처리
  };

  return (
    <main className="max-w-160 mx-auto p-6">
      <h1 className="text-18-b mb-4">체험 수정 페이지</h1>
      <ExperienceForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="수정 완료"
      />
    </main>
  );
}
