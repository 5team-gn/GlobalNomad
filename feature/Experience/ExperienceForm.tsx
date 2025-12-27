"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button/Button";
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import { Input } from "@/components/common/input";
import ProductImageInput from "./ProductImageInput";
import Delete from "@/public/delete_button.svg";
import Image from "next/image";
import ScheduleRow from "./schedule/ScheduleRow";
import { useScheduleManager } from "@/hooks/useScheduleManager";

interface Props {
  initialValues?: Partial<ExperienceFormValues>;
  onSubmit: (values: ExperienceFormValues) => void;
  submitLabel?: string;
}

interface ImageItem {
  file: File;
  preview: string;
}

export default function ExperienceForm({ initialValues, onSubmit }: Props) {
  const [values, setValues] = useState<ExperienceFormValues>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    category: initialValues?.category ?? "",
    price: initialValues?.price ?? 0,
    address: initialValues?.address ?? "",
    bannerImageUrl: initialValues?.bannerImageUrl ?? "",
    schedules: initialValues?.schedules ?? [],
    subImageUrls: initialValues?.subImageUrls ?? [],
  });

  const [bannerImages, setBannerImages] = useState<ImageItem[]>([]);
  const [detailImages, setDetailImages] = useState<ImageItem[]>([]);

  const {date,startTime,endTime,schedules,setDate,setStartTime,setEndTime,isAddDisabled,addSchedule,removeSchedule,
  } = useScheduleManager(initialValues?.schedules ?? []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...values,
      schedules,
      bannerImageUrl: bannerImages[0]?.preview ?? "",
      subImageUrls: detailImages.map((img) => img.preview),
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

      <label>제목</label>
      <Input
        name="title"
        value={values.title}
        onChange={handleChange}
        placeholder="제목을 입력해 주세요"
      />

      <label>카테고리</label>
      <input
        name="category"
        placeholder="카테고리를 선택해 주세요"
        value={values.category}
        onChange={handleChange}
        className="border p-3 rounded-xl"
      />

      <label>설명</label>
      <textarea
        name="description"
        placeholder="체험에 대한 설명을 입력해 주세요"
        value={values.description}
        onChange={handleChange}
        className="border p-3 rounded-xl"
      />

      <label>가격</label>
      <input
        name="price"
        type="number"
        placeholder="체험 금액을 입력해주세요"
        value={values.price}
        onChange={handleChange}
        className="border p-3 rounded-xl"
      />

      <label>주소</label>
      <input
        name="address"
        placeholder="주소를 입력해 주세요"
        value={values.address}
        onChange={handleChange}
        className="border p-3 rounded-xl"
      />

      {/* 예약 가능 시간대 */}
      <h2 className="text-16-b">예약 가능한 시간대</h2>
      <ScheduleRow
        date={date}
        startTime={startTime}
        endTime={endTime}
        actionType="add"
        disabled={false}
        addDisabled={isAddDisabled}
        onAction={addSchedule}
        onDateChange={setDate}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
      />
        <div className="h-px w-full bg-gray-100"></div>

      <div className="flex flex-col gap-3 mt-4">
        {schedules.map((item, index) => (
          <ScheduleRow
          key={index}
          date={item.date}
          startTime={item.startTime}
          endTime={item.endTime}
          actionType="remove"
          onAction={() => removeSchedule(index)}
          />
        ))}
      </div>

      {/* 배너 이미지 */}
      <h2 className="text-16-b">배너 이미지 등록</h2>

      <div className="flex gap-7">
        <ProductImageInput
          currentCount={bannerImages.length}
          maxCount={4}
          onImageUpload={(files) =>
            setBannerImages((prev) => [
              ...prev,
              ...files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
              })),
            ])
          }
        />

        <div className="flex gap-4 flex-wrap">
          {bannerImages.map((image, index) => (
            <div key={index} className="relative w-42 h-42">
              <Image
                src={image.preview}
                alt="배너 이미지"
                fill
                className="object-cover rounded"
              />
              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(image.preview);
                  setBannerImages((prev) => prev.filter((_, i) => i !== index));
                }}
                className="absolute -top-2 -right-2 flex w-6.5 h-6.5 items-center justify-center rounded-full bg-gray-950 text-white"
              >
                <Delete />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 서브 이미지 */}
      <h2 className="text-16-b">소개 이미지 등록</h2>

      <div className="flex gap-7">
        <ProductImageInput
          currentCount={detailImages.length}
          maxCount={4}
          onImageUpload={(files) =>
            setDetailImages((prev) => [
              ...prev,
              ...files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
              })),
            ])
          }
        />

        <div className="flex gap-4 flex-wrap">
          {detailImages.map((image, index) => (
            <div key={index} className="relative w-42 h-42">
              <Image
                src={image.preview}
                alt="소개 이미지"
                fill
                className="object-cover rounded"
              />
              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(image.preview);
                  setDetailImages((prev) => prev.filter((_, i) => i !== index));
                }}
                className="absolute -top-2 -right-2 flex w-6.5 h-6.5 items-center justify-center rounded-full bg-gray-950 text-white hover:cursor-pointer"
              >
                <Delete />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full justify-center">
        <Button variant="primary" size="sm" className="px-10 py-3 rounded-2xl">
          등록하기
        </Button>
      </div>
    </form>
  );
}
