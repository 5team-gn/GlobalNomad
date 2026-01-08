//체험 등록 페이지
"use client";

import ExperienceForm from "@/feature/Experience/ExperienceForm";
import { createFrom } from "@/lib/services/createForm"; 
import { mapFormToCreateActivity } from "@/adapters/form.adapter"; 
import type { ExperienceFormValues } from "@/types/ExperienceForm.types"; 
import { useRouter } from "next/navigation";
import { TEAM_ID } from "@/constants/env";
import toast from "react-hot-toast";

export default function NewExperiencePage() {
  const router = useRouter();

  const handleSubmit = async (values: ExperienceFormValues) => {
    try {
      const body = mapFormToCreateActivity(values);

      await createFrom(TEAM_ID, body);

      toast("체험이 등록되었습니다!");
      router.push("/myinfo/experiences");
    } catch (error) {
      toast((error as Error).message);
    }
  };

  return <ExperienceForm onSubmit={handleSubmit} />;
}