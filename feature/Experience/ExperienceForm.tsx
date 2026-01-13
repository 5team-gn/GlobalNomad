"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import CategorySelect from "@/components/dropdown/CategorySelect";

import { ImageSection } from "./ImageSection";
import { ScheduleSection } from "./ScheduleSection";
import { AddressInput } from "./AddressInput";

import { useScheduleManager } from "@/hooks/useScheduleManager";
import { useImageManager } from "@/hooks/useImageManager";

import { TEAM_ID } from "@/constants/env";
import { postcreateFrom } from "@/lib/services/createForm";
import { patchupdateMyActivity } from "@/lib/services/updateMyActivity";
import { ApiError } from "@/lib/api/apiFetch";

import { mapFormToCreateActivity } from "@/adapters/form.adapter";
import { mapFormToUpdateActivity } from "@/adapters/updateActivity.adapter";

import type { ExperienceFormValues } from "@/types/ExperienceForm.types";
import type { ActivityDetailResponse } from "@/types/activities/activity.types";

import { uploadActivityImage } from "@/lib/services/uploadActivityImage";

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

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceFormValues>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: 0,
      address: "",
      bannerImageUrl: "",
      schedules: [],
    },
  });

  /** ------------------------------
   * edit 모드: 서버 데이터 들어오면 form reset
   -------------------------------- */
  useEffect(() => {
    if (mode === "edit" && initialValues) {
      reset({
        title: initialValues.title ?? "",
        category: initialValues.category ?? "",
        description: initialValues.description ?? "",
        price: initialValues.price ?? 0,
        address: initialValues.address ?? "",
        bannerImageUrl: initialValues.bannerImageUrl ?? "",
        schedules: initialValues.schedules ?? [],
      });
    }
  }, [mode, initialValues, reset]);

  const addressValue = watch("address");

  const scheduleManager = useScheduleManager(initialValues?.schedules ?? []);
  const bannerImages = useImageManager(
    initialValues?.bannerImageUrl ? [initialValues.bannerImageUrl] : []
  );
  const detailImages = useImageManager(initialValues?.subImageUrls ?? []);

  /** ------------------------------
   * 이미지 / 스케줄 변경 시 hidden field 동기화
   -------------------------------- */
  useEffect(() => {
    setValue("bannerImageUrl", bannerImages.images[0]?.preview ?? "");
    setValue("schedules", scheduleManager.schedules);
  }, [bannerImages.images, scheduleManager.schedules, setValue]);

  /** ------------------------------
   * submit handler
   -------------------------------- */
  const onValidSubmit = async (data: ExperienceFormValues) => {
    try {
      // --- 1) 배너 URL 결정 ---
      // edit: 새 파일 없으면 기존 URL 유지
      // create: 반드시 업로드 필요
      const bannerItem = bannerImages.images[0];

      const bannerImageUrl = bannerItem?.file
        ? await uploadActivityImage(bannerItem.file)
        : mode === "edit"
        ? initialValues?.bannerImageUrl ?? ""
        : "";

      if (!bannerImageUrl) {
        toast.error("배너 이미지를 등록해 주세요.");
        return;
      }

      // --- 2) 서브 이미지 URL 결정 ---
      // edit: 기존 URL + 새로 추가된 파일 업로드 URL을 합침
      const existingSubUrls =
        mode === "edit" ? initialValues?.subImageUrls ?? [] : [];

      const newDetailFiles = detailImages.images
        .map((img) => img.file)
        .filter((f): f is File => Boolean(f));

      const uploadedSubUrls =
        newDetailFiles.length > 0
          ? await Promise.all(newDetailFiles.map((f) => uploadActivityImage(f)))
          : [];

      const subImageUrls =
        mode === "edit"
          ? [...existingSubUrls, ...uploadedSubUrls]
          : uploadedSubUrls;

      // --- 3) 최종 payload: https URL ---
      const formData = {
        ...data,
        schedules: scheduleManager.schedules,
        bannerImageUrl,
        subImageUrls,
      };

      if (mode === "create") {
        const body = mapFormToCreateActivity(formData);
        await postcreateFrom(TEAM_ID, body);
        toast.success("체험이 등록되었습니다!");
        router.push("/myinfo?menu=MY_EXPERIENCE");
      }

      if (mode === "edit") {
        if (!originalData) {
          toast.error("체험 정보를 불러오지 못했습니다.");
          return;
        }

        const body = mapFormToUpdateActivity(originalData, formData);
        await patchupdateMyActivity(originalData.id, body);
        toast.success("체험이 수정되었습니다!");
        router.push(`/activities/${originalData.id}`);
      }

      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            toast.error(error.message);
            break;
          case 403:
            toast.error("본인의 체험만 수정할 수 있습니다.");
            break;
          case 409:
            toast.error("겹치는 예약 가능 시간대가 존재합니다.");
            break;
          default:
            toast.error("체험 처리 중 오류가 발생했습니다.");
        }
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."
        );
      }
    }
  };

  const hasChanges = (() => {
    if (mode !== "edit" || !originalData) return true; // create는 항상 가능

    // 1) 텍스트/기본 필드 변경
    const w = watch();
    const basicChanged =
      (w.title ?? "") !== (initialValues?.title ?? "") ||
      (w.category ?? "") !== (initialValues?.category ?? "") ||
      (w.description ?? "") !== (initialValues?.description ?? "") ||
      Number(w.price ?? 0) !== Number(initialValues?.price ?? 0) ||
      (w.address ?? "") !== (initialValues?.address ?? "");

    // 2) 스케줄 변경 (간단 비교: 길이/내용 문자열화)
    const prevSchedules = JSON.stringify(initialValues?.schedules ?? []);
    const nextSchedules = JSON.stringify(scheduleManager.schedules ?? []);
    const schedulesChanged = prevSchedules !== nextSchedules;

    // 3) 배너 이미지 변경: 새 파일이 있으면 변경
    const bannerChanged = Boolean(bannerImages.images[0]?.file);

    // 4) 서브 이미지 변경: 새 파일 추가 or 기존 URL 제거 등
    // - 새 파일 추가
    const addedDetailFile = detailImages.images.some((img) =>
      Boolean(img.file)
    );
    // - 기존 URL 제거(초기 값 대비 현재 미리보기(기존 url) 개수 감소)
    //   useImageManager가 초기 URL을 images에 넣어두는 구조라는 전제입니다.
    const initialSubCount = (initialValues?.subImageUrls ?? []).length;
    const currentExistingUrlCount = detailImages.images.filter(
      (img) =>
        !img.file &&
        typeof img.preview === "string" &&
        img.preview.startsWith("http")
    ).length;
    const removedExistingUrl = currentExistingUrlCount < initialSubCount;

    const imagesChanged =
      bannerChanged || addedDetailFile || removedExistingUrl;

    return basicChanged || schedulesChanged || imagesChanged;
  })();

  return (
    <form
      className="flex lg:w-175 flex-col gap-6 pb-20"
      onSubmit={handleSubmit(onValidSubmit)}
    >
      <h1 className="text-18-b">
        {mode === "create" ? "내 체험 등록" : "내 체험 수정"}
      </h1>

      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <label className="text-16-b">제목</label>
        <Input
          {...register("title", { required: "제목을 입력해 주세요" })}
          placeholder="제목을 입력해 주세요"
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
          render={({ field }) => (
            <CategorySelect
              options={CATEGORY_OPTIONS}
              value={field.value}
              placeholder="카테고리를 선택해 주세요"
              onChange={(val) => {
                field.onChange(val);
                trigger("category");
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
          className="border p-4 rounded-xl h-40 resize-none"
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
        />
        <input
          type="hidden"
          {...register("address", { required: "주소를 검색해 주세요" })}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <ScheduleSection manager={scheduleManager} />

      <ImageSection
        title="배너 이미지 (필수)"
        images={bannerImages.images}
        maxCount={1}
        onUpload={bannerImages.addImages}
        onRemove={bannerImages.removeImage}
      />

      <ImageSection
        title="소개 이미지 (최대 4개)"
        images={detailImages.images}
        maxCount={4}
        onUpload={detailImages.addImages}
        onRemove={detailImages.removeImage}
      />

      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting || (mode === "edit" && !hasChanges)}
      >
        {isSubmitting
          ? "처리 중..."
          : mode === "create"
          ? "등록하기"
          : "수정하기"}
      </Button>
    </form>
  );
}
