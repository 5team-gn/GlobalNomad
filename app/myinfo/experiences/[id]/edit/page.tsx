"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ExperienceForm from "@/feature/Experience/ExperienceForm";
import { mapActivityToFormValues } from "@/adapters/activityToform.adapter";
import { mapFormToUpdateActivity } from "@/adapters/updateActivity.adapter";
import { updateMyActivity } from "@/lib/services/updateMyActivity";
import { TEAM_ID } from "@/constants/env";
import toast from "react-hot-toast";

import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import type { ActivityDetailResponse } from "@/types/activities/activity.types";

export default function EditExperiencePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [originalData, setOriginalData] =
    useState<ActivityDetailResponse | null>(null);
  const [initialValues, setInitialValues] =
    useState<ExperienceFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  //  기존 체험 상세 조회
  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const res = await fetch(`/${TEAM_ID}/my-activities/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message ?? "체험 정보를 불러오지 못했습니다.");
        }

        const data: ActivityDetailResponse = await res.json();

        setOriginalData(data);
        setInitialValues(mapActivityToFormValues(data));
      } catch (error) {
        toast((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetail();
  }, [id]);

  //  수정 제출
  const handleSubmit = async (values: ExperienceFormValues) => {
    if (!originalData) return;

    try {
      const body = mapFormToUpdateActivity(originalData, values);

      await updateMyActivity(TEAM_ID, Number(id), body);

      toast("체험이 수정되었습니다!");
      router.push("/myinfo/experiences");
    } catch (error) {
      toast((error as Error).message);
    }
  };

  //  로딩 처리
  if (loading || !initialValues) {
    return <div className="py-10 text-center">로딩중...</div>;
  }

  //  Form 재사용
  return (
    <ExperienceForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel="수정하기"
    />
  );
}
