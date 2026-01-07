"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button/Button";
import { ImageSection } from "./ImageSection";
import { ScheduleSection } from "./ScheduleSection";
import { useScheduleManager } from "@/hooks/useScheduleManager";
import { useImageManager } from "@/hooks/useImageManager";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import { Input } from "@/components/input/Input";
import CategorySelect from "@/components/dropdown/CategorySelect";

interface Props {
  initialValues?: Partial<ExperienceFormValues>;
  onSubmit: (values: ExperienceFormValues) => void;
  submitLabel?: string;
}

const CATEGORY_OPTIONS = [
  "문화 · 예술",
  "식음료",
  "투어",
  "관광",
  "웰빙",
];

export default function ExperienceForm({
  initialValues,
  onSubmit,
  submitLabel = "등록하기",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  /** 🔑 카테고리 로컬 상태 */
  const [category, setCategory] = useState(
    initialValues?.category ?? ""
  );

  const onValidSubmit = (data: ExperienceFormValues) => {
    onSubmit({
      ...data,
      schedules: scheduleManager.schedules,
      bannerImageUrl: bannerImages.images[0]?.preview ?? "",
      subImageUrls: detailImages.images.map((img) => img.preview),
    });
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

      {/* ================= 카테고리 ================= */}
      <label>카테고리</label>

      {/* 🔑 react-hook-form 연결용 hidden input */}
      <input
        type="hidden"
        value={category}
        {...register("category", {
          required: "카테고리를 선택해 주세요",
        })}
      />

      {/* 🔑 실제 UI는 커스텀 드롭다운 */}
      <CategorySelect
        options={CATEGORY_OPTIONS}
        value={category}
        placeholder="카테고리를 선택해 주세요"
        onChange={setCategory}
      />

      {errors.category && (
        <p className="text-red-500 text-sm">
          {errors.category.message}
        </p>
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
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
