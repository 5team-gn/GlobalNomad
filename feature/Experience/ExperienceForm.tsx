"use client";

import { useRef } from "react";
import { Button } from "@/components/button/Button";
import { ImageSection } from "./ImageSection";
import { ScheduleSection } from "./ScheduleSection";
import { useScheduleManager } from "@/hooks/useScheduleManager";
import { useImageManager } from "@/hooks/useImageManager";


import type { ExperienceFormValues } from "@/types/ExperienceForm.types";

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

  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const scheduleManager = useScheduleManager(initialValues?.schedules ?? []);

  const bannerImages = useImageManager();
  const detailImages = useImageManager();

  const handleSubmit = () => {
    onSubmit({
      title: titleRef.current?.value ?? "",
      category: categoryRef.current?.value ?? "",
      description: descriptionRef.current?.value ?? "",
      price: Number(priceRef.current?.value ?? 0),
      address: addressRef.current?.value ?? "",
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
      <input
        name="title"
        defaultValue={initialValues?.title}
        placeholder="제목을 입력해 주세요"
        ref={titleRef}
        className="border p-3 rounded-xl"
      />

      {/* 카테고리 */}
      <label>카테고리</label>
      <input
        name="category"
        defaultValue={initialValues?.category}
        placeholder="카테고리를 선택해 주세요"
        ref={categoryRef}
        className="border p-3 rounded-xl"
      />

      {/* 설명 */}
      <label>설명</label>
      <textarea
        name="description"
        defaultValue={initialValues?.description}
        placeholder="체험에 대한 설명을 입력해 주세요"
        ref={descriptionRef}
        className="border p-3 rounded-xl"
      />

      {/* 가격 */}
      <label>가격</label>
      <input
        name="price"
        type="number"
        defaultValue={initialValues?.price}
        placeholder="체험 금액을 입력해주세요"
        ref={priceRef}
        className="border p-3 rounded-xl"
      />

      {/* 주소 */}
      <label>주소</label>
      <input
        name="address"
        defaultValue={initialValues?.address}
        placeholder="주소를 입력해 주세요"
        ref={addressRef}
        className="border p-3 rounded-xl"
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
