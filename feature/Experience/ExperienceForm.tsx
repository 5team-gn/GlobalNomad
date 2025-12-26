"use client";

import { useState } from "react";
import {Button} from "@/components/button/Button";  
import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import { Input } from "@/components/common/input";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      <div>
        <h1 className="text-18-b">내 체험 등록</h1>
      </div>
      <label> 제목</label>
      <Input
        name="title"
        placeholder="제목을 입력해 주세요"
        value={values.title}
        onChange={handleChange}
        className="border border-gray-100  p-3 rounded-xl"
      />
      <label> 카테고리</label>
      <input
        name="category"
        placeholder="카테고리를 선택해 주세요"
        value={values.category}
        onChange={handleChange}
        className="border  border-gray-100 p-3 rounded-xl"
      />
      <label> 설명</label>
      <textarea
        name="description"
        placeholder="체험에 대한 설명을 입력해 주세요"
        value={values.description}
        onChange={handleChange}
        className="border border-gray-100 p-3 rounded-xl"
      />
      <label> 가격</label>
      <input
        name="price"
        type="number"
        placeholder="체험 금액을 입력해주세요"
        value={values.price}
        onChange={handleChange}
        className="border border-gray-100 p-3 rounded-xl"
      />
      <label> 주소</label>
      <input
        name="address"
        placeholder="주소를 입력해 주세요"
        value={values.address}
        onChange={handleChange}
        className="border border-gray-100 p-3 rounded-xl"
      />
      <h1 className="text-18-b">얘약 가능한 시간대 </h1>
      <label> 날짜</label>
      <input
        name="bannerImageUrl"
        placeholder="배너 이미지 URL"
        value={values.bannerImageUrl}
        onChange={handleChange}
        className="border p-3 rounded-xl"
      />
      <Button variant="primary" size="md">
        {submitLabel}
      </Button>
    </form>
  );
}
