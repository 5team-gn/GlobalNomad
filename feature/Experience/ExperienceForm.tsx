"use client";

import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input"; 
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";

import { useExperienceForm } from "@/hooks/useExperienceForm";
import { useScheduleManager } from "@/hooks/useScheduleManager";
import { useImageManager } from "@/hooks/useImageManager";

import { ImageSection } from "./ImageSection"; 
import { ScheduleSection } from "./ScheduleSection"; 

interface Props {
  initialValues?: Partial<ExperienceFormValues>;
  onSubmit: (values: ExperienceFormValues) => void;
  submitLabel?: string;
}

export default function ExperienceForm({
  initialValues,
  onSubmit,
  submitLabel = "등록하기",
}: Props) {
  /** 기본 폼 상태 */
  const { values, handleChange } = useExperienceForm(initialValues);

  /** 스케줄 관리 */
  const scheduleManager = useScheduleManager(
    initialValues?.schedules ?? []
  );

  /** 이미지 관리 */
  const bannerImages = useImageManager();
  const detailImages = useImageManager();

  const handleSubmit = () => {
    onSubmit({
      ...values,
      schedules: scheduleManager.schedules,
      bannerImageUrl: bannerImages.images[0]?.preview ?? "",
      subImageUrls: detailImages.images.map((img) => img.preview),
    });
  };

  return (
    <form
      className="flex lg:w-175 flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h1 className="text-18-b">내 체험 등록</h1>

      {/* 제목 */}
      <label>제목</label>
      <Input
        name="title"
        value={values.title}
        onChange={handleChange}
        placeholder="제목을 입력해 주세요"
      />

      {/* 카테고리 */}
      <label>카테고리</label>
      <Input
        name="category"
        value={values.category}
        onChange={handleChange}
        placeholder="카테고리를 선택해 주세요"
      />

      {/* 설명 */}
      <label>설명</label>
      <textarea
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="체험에 대한 설명을 입력해 주세요"
        className="border p-3 rounded-xl"
      />

      {/* 가격 */}
      <label>가격</label>
      <Input
        name="price"
        type="number"
        value={values.price}
        onChange={handleChange}
        placeholder="체험 금액을 입력해주세요"
      />

      {/* 주소 */}
      <label>주소</label>
      <Input
        name="address"
        value={values.address}
        onChange={handleChange}
        placeholder="주소를 입력해 주세요"
      />

      {/* 예약 가능한 시간대 */}
      <ScheduleSection manager={scheduleManager} />

      {/* 배너 이미지 */}
      <ImageSection
        title="배너 이미지 등록"
        images={bannerImages.images}
        maxCount={4}
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
