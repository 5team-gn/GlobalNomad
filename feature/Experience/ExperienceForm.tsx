"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/button/Button";
import { ImageSection } from "./ImageSection";
import { ScheduleSection } from "./ScheduleSection";
import { AddressInput } from "./AddressInput";
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

const CATEGORY_OPTIONS = [
  "문화 · 예술",
  "식음료",
  "스포츠",
  "투어",
  "관광",
  "웰빙",
];

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

  const addressValue = watch("address");
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
      className="flex lg:w-175 flex-col gap-6 pb-20"
      onSubmit={handleSubmit(onValidSubmit)}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-18-b">내 체험 등록</h1>
        <Button
          type="submit"
          variant="primary"
          className="px-10 py-3 rounded-2xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "등록 중..." : submitLabel}
        </Button>
      </div>

      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-16-b">
          제목
        </label>
        <Input
          id="title"
          {...register("title", { required: "제목을 입력해 주세요" })}
          placeholder="제목을 입력해 주세요"
          className="border p-4 rounded-xl"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* 카테고리 */}
      <div className="flex flex-col gap-2">
        <label className="text-16-b">카테고리</label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "카테고리를 선택해 주세요" }}
          render={({ field: { value, onChange } }) => (
            <CategorySelect
              options={CATEGORY_OPTIONS}
              value={value}
              placeholder="카테고리를 선택해 주세요"
              onChange={(val) => {
                onChange(val);
                trigger("category"); // 선택 시 즉시 검증
              }}
            />
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* 설명 */}
      <div className="flex flex-col gap-2">
        <label className="text-16-b">설명</label>
        <textarea
          {...register("description", { required: "설명을 입력해 주세요" })}
          placeholder="체험에 대한 설명을 입력해 주세요"
          className={`border p-4 rounded-xl h-40 resize-none focus:outline-primary-500 ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* 가격 */}
      <div className="flex flex-col gap-2">
        <label className="text-16-b">가격</label>
        <Input
          type="number"
          {...register("price", {
            required: "가격을 입력해 주세요",
            valueAsNumber: true,
            min: { value: 0, message: "0원 이상 입력 가능합니다" },
          })}
          placeholder="체험 금액을 입력해 주세요"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* 주소 */}
      <div className="flex flex-col gap-2">
        <label className="text-16-b">주소</label>
        <AddressInput
          value={addressValue}
          onChange={(val) => setValue("address", val, { shouldValidate: true })}
          error={errors.address?.message}
        />
        <input
          type="hidden"
          {...register("address", { required: "주소를 검색해 주세요" })}
        />
      </div>

      <hr className="border-gray-100 my-4" />

      {/* 스케줄 - Validation 통합 */}
      <div className="flex flex-col gap-2">
        <ScheduleSection manager={scheduleManager} />
        <input
          type="hidden"
          {...register("schedules", {
            validate: (value) =>
              (value && value.length > 0) ||
              "시간대를 최소 1개 이상 추가해 주세요.",
          })}
        />
        {errors.schedules && (
          <p className="text-red-500 text-sm">{errors.schedules.message}</p>
        )}
      </div>

      <hr className="border-gray-100 my-4" />

      {/* 배너 이미지 - Validation 통합 */}
      <div className="flex flex-col gap-2">
        <ImageSection
          title="배너 이미지 (필수)"
          images={bannerImages.images}
          maxCount={1}
          onUpload={bannerImages.addImages}
          onRemove={bannerImages.removeImage}
        />
        <input
          type="hidden"
          {...register("bannerImageUrl", {
            required: "배너 이미지는 필수입니다.",
          })}
        />
        {errors.bannerImageUrl && (
          <p className="text-red-500 text-sm">
            {errors.bannerImageUrl.message}
          </p>
        )}
      </div>

      {/* 소개 이미지 */}
      <ImageSection
        title="소개 이미지 (최대 4개)"
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
