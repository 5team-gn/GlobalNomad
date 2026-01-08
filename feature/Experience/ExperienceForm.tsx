"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/button/Button";
import { ImageSection } from "./ImageSection";
import { ScheduleSection } from "./ScheduleSection";
import { AddressInput } from "./AddressInput";
import { useScheduleManager } from "@/hooks/useScheduleManager";
import { useImageManager } from "@/hooks/useImageManager";
import { Input } from "@/components/input/Input";
import CategorySelect from "@/components/dropdown/CategorySelect";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";

interface Props {
  initialValues?: Partial<ExperienceFormValues>;
  onSubmit: (values: ExperienceFormValues) => void;
  submitLabel?: string;
}

// 1. 카테고리 옵션 수정 (스포츠 추가)
const CATEGORY_OPTIONS = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

export default function ExperienceForm({
  initialValues,
  onSubmit,
  submitLabel = "등록하기",
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
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

  const addressValue = watch("address");
  const scheduleManager = useScheduleManager(initialValues?.schedules ?? []);
  const bannerImages = useImageManager();
  const detailImages = useImageManager();

  const onValidSubmit = (data: ExperienceFormValues) => {
    if (scheduleManager.schedules.length === 0) {
      alert("예약 가능한 시간대를 최소 1개 이상 추가해 주세요.");
      return;
    }
    if (bannerImages.images.length === 0) {
      alert("배너 이미지는 필수입니다.");
      return;
    }

    const finalData = {
      ...data,
      schedules: scheduleManager.schedules,
      bannerImageUrl: bannerImages.images[0]?.preview ?? "",
      subImageUrls: detailImages.images.map((img) => img.preview),
    };

    onSubmit(finalData);
    alert("등록이 완료되었습니다."); 
  };

  return (
    <form
      className="flex lg:w-175 flex-col gap-6"
      onSubmit={handleSubmit(onValidSubmit)}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-18-b">내 체험 등록</h1>
        <Button
          type="submit"
          variant="primary"
          className="px-10 py-3 rounded-2xl"
        >
          {submitLabel}
        </Button>
      </div>

      {/* 제목 (필수) */}
      <div className="flex flex-col gap-2">
        <label className="text-16-b">제목</label>
        <Input
          {...register("title", { required: "제목을 입력해 주세요" })}
          placeholder="제목을 입력해 주세요"
          className="border p-4 rounded-xl"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* 카테고리 (필수) */}
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
              onChange={onChange}
            />
          )}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      {/* 설명 (필수) */}
      <div className="flex flex-col gap-2">
        <label className="text-16-b">설명</label>
        <textarea
          {...register("description", { required: "설명을 입력해 주세요" })}
          placeholder="체험에 대한 설명을 입력해 주세요"
          className="border p-4 rounded-xl h-40 resize-none focus:outline-primary-500"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* 가격 (필수) */}
      <div className="flex flex-col gap-2">
        <label className="text-16-b">가격</label>
        <Input
          type="number"
          {...register("price", { 
            required: "가격을 입력해 주세요",
            valueAsNumber: true, 
            min: { value: 0, message: "0원 이상 입력 가능합니다" } 
          })}
          placeholder="체험 금액을 입력해 주세요"
          className="border p-4 rounded-xl"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      {/* 주소 (필수 - Daum API 연동) */}
      <div className="flex flex-col gap-2">
        <label className="text-16-b">주소</label>
        <AddressInput 
          value={addressValue}
          onChange={(val) => setValue("address", val, { shouldValidate: true })}
          error={errors.address?.message}
        />
        {/* hidden input for react-hook-form validation */}
        <input type="hidden" {...register("address", { required: "주소를 검색해 주세요" })} />
      </div>

      <hr className="border-gray-100 my-4" />

      {/* 예약 가능한 시간대 (+/- 버튼 로직 포함) */}
      <ScheduleSection manager={scheduleManager} />

      <hr className="border-gray-100 my-4" />

      {/* 배너 이미지 (최대 1개, 필수) */}
      <ImageSection
        title="배너 이미지 (필수)"
        images={bannerImages.images}
        maxCount={1}
        onUpload={bannerImages.addImages}
        onRemove={bannerImages.removeImage}
      />

      {/* 소개 이미지 (최대 4개) */}
      <ImageSection
        title="소개 이미지 (최대 4개)"
        images={detailImages.images}
        maxCount={4}
        onUpload={detailImages.addImages}
        onRemove={detailImages.removeImage}
      />
    </form>
  );
}