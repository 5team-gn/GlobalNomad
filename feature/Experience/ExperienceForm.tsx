"use client";

import { useForm, Controller } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/button/Button";
import { ImageSection } from "./ImageSection";
import { ScheduleSection } from "./ScheduleSection";
import { useScheduleManager } from "@/hooks/useScheduleManager";
import { useImageManager } from "@/hooks/useImageManager";
import { Input } from "@/components/input/Input";
import CategorySelect from "@/components/dropdown/CategorySelect";
import toast from "react-hot-toast";

import { TEAM_ID } from "@/constants/env";
import { postcreateFrom } from "@/lib/services/createForm";
import { patchupdateMyActivity } from "@/lib/services/updateMyActivity";
import { mapFormToCreateActivity } from "@/adapters/form.adapter";
import { mapFormToUpdateActivity } from "@/adapters/updateActivity.adapter";

import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import type { ActivityDetailResponse } from "@/types/activities/activity.types";

interface Props {
  mode: "create" | "edit";
  initialValues?: Partial<ExperienceFormValues>;
  originalData?: ActivityDetailResponse;
}

const CATEGORY_OPTIONS = ["문화 · 예술", "식음료", "투어", "관광", "웰빙"];

export default function ExperienceForm({
  mode,
  initialValues,
  originalData,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const activityId = params?.id as string;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceFormValues>({
    defaultValues: {
      title: initialValues?.title ?? "",
      category: initialValues?.category ?? "",
      description: initialValues?.description ?? "",
      price: initialValues?.price ?? 0,
      address: initialValues?.address ?? "",
    },
  });

  const scheduleManager = useScheduleManager(initialValues?.schedules ?? []);
  const bannerImages = useImageManager();
  const detailImages = useImageManager();

  const onValidSubmit = async (data: ExperienceFormValues) => {
    try {
      const formData = {
        ...data,
        schedules: scheduleManager.schedules,
        bannerImageUrl: bannerImages.images[0]?.preview ?? "",
        subImageUrls: detailImages.images.map((img) => img.preview),
      };

      if (mode === "create") {
        const body = mapFormToCreateActivity(formData);
        await postcreateFrom(TEAM_ID, body);
        toast.success("체험이 등록되었습니다!");
      } else {
        if (!originalData || !activityId) return;
        const body = mapFormToUpdateActivity(originalData, formData);
        await patchupdateMyActivity(TEAM_ID, Number(activityId), body);
        toast.success("체험이 수정되었습니다!");
      }

      router.push("/myinfo/experiences");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form
      className="flex lg:w-175 flex-col gap-6"
      onSubmit={handleSubmit(onValidSubmit)}
    >
      <h1 className="text-18-b">내 체험 등록</h1>

      {/* 제목 */}
      <label>제목</label>
      <Input
        {...register("title", { required: "제목을 입력해 주세요" })}
        placeholder="제목을 입력해 주세요"
        className="border p-3 rounded-xl"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <label htmlFor="category">카테고리</label>

      <Controller
        name="category"
        control={control}
        rules={{ required: "카테고리를 선택해 주세요" }}
        render={({ field: { value, onChange } }) => (
          <CategorySelect
            id="category"
            options={CATEGORY_OPTIONS}
            value={value}
            placeholder="카테고리를 선택해 주세요"
            onChange={onChange}
          />
        )}
      />

      {errors.category && (
        <p className="text-red-500 text-sm">{errors.category.message}</p>
      )}

      {/* 설명 */}
      <label>설명</label>
      <textarea
        {...register("description")}
        placeholder="체험에 대한 설명을 입력해 주세요"
        className="border p-3 rounded-xl"
      />

      {/* 가격 */}
      <label>가격</label>
      <Input
        type="number"
        {...register("price", { valueAsNumber: true, min: 0 })}
        placeholder="체험 금액을 입력해주세요"
        className="border p-3 rounded-xl"
      />

      {/* 주소 */}
      <label>주소</label>
      <Input
        {...register("address")}
        placeholder="주소를 입력해 주세요"
        className="border p-3 rounded-xl"
      />

      {/* 예약 가능한 시간대 */}
      <ScheduleSection manager={scheduleManager} />

      {/* 배너 이미지 */}
      <ImageSection
        title="배너 이미지 등록"
        images={bannerImages.images}
        maxCount={1}
        onUpload={bannerImages.addImages}
        onRemove={bannerImages.removeImage}
      />

      {/* 소개 이미지 */}
      <ImageSection
        title="소개 이미지 등록"
        images={detailImages.images}
        maxCount={4}
        onUpload={detailImages.addImages}
        onRemove={detailImages.removeImage}
      />

      {/* 제출 버튼 */}
      <div className="flex w-full justify-center">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="px-10 py-3 rounded-2xl"
        >
          {isSubmitting
            ? "처리중"
            : mode === "create"
            ? "등록하기"
            : "수정하기"}
        </Button>
      </div>
    </form>
  );
}
