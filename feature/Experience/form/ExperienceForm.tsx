"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import CategorySelect from "@/components/dropdown/CategorySelect";
import { BasicModal, AlertModal } from "@/components/modal";

import { ImageSection } from "./ImageSection";
import { ScheduleSection } from "./ScheduleSection";
import { AddressInput } from "../AddressInput";

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

/**
 * ✅ getActivityDetail()이 반환하는 ActivityDetail(프로젝트 내부 타입)이
 * ActivityDetailResponse와 schedules 구조가 달라서 그대로 못 받는 문제 해결용 최소 타입
 */
type ActivityDetailLike = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages?: Array<{ id: number; imageUrl: string }>;
  schedules?: unknown;
};

interface Props {
  mode: "create" | "edit";
  initialValues?: Partial<ExperienceFormValues>;
  // ✅ 여기만 고치면 edit 페이지에서 ActivityDetail도 통과함
  originalData?: ActivityDetailResponse | ActivityDetailLike;
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
  const SUCCESS_REDIRECT_URL = "/myinfo?menu=MY_EXPERIENCE";

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const isExitingRef = useRef(false);

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
      subImageUrls: [], // ✅ 누락되어 있어서 추가(이미지 비교 로직에 필요)
    },
  });

  const scheduleManager = useScheduleManager(initialValues?.schedules ?? []);
  const bannerImages = useImageManager(
    initialValues?.bannerImageUrl ? [initialValues.bannerImageUrl] : [],
  );
  const detailImages = useImageManager(initialValues?.subImageUrls ?? []);

  // 1. 초기 데이터 바인딩
  useEffect(() => {
    if (
      mode === "edit" &&
      initialValues &&
      Object.keys(initialValues).length > 0 &&
      !isInitialized
    ) {
      if (initialValues.schedules)
        scheduleManager.initSchedules(initialValues.schedules);
      if (initialValues.bannerImageUrl)
        bannerImages.initImages([initialValues.bannerImageUrl]);
      if (initialValues.subImageUrls)
        detailImages.initImages(initialValues.subImageUrls);

      reset({
        ...initialValues,
        title: initialValues.title ?? "",
        category: initialValues.category ?? "",
        description: initialValues.description ?? "",
        price: initialValues.price ?? 0,
        address: initialValues.address ?? "",
        bannerImageUrl: initialValues.bannerImageUrl ?? "",
        schedules: initialValues.schedules ?? [],
        subImageUrls: initialValues.subImageUrls ?? [],
      });

      setIsInitialized(true);
    }
  }, [
    mode,
    initialValues,
    isInitialized,
    reset,
    scheduleManager,
    bannerImages,
    detailImages,
  ]);

  const addressValue = watch("address");

  const handleAddressChange = useCallback(
    (val: string) => {
      setValue("address", val, { shouldValidate: true, shouldDirty: true });
      trigger("address");
    },
    [setValue, trigger],
  );

  // 2. 스케줄 동기화
  useEffect(() => {
    if (isInitialized || mode === "create") {
      setValue("schedules", scheduleManager.schedules, { shouldDirty: true });
    }
  }, [scheduleManager.schedules, setValue, isInitialized, mode]);

  // 3. 변경 사항 감지
  const hasChanges = (() => {
    if (mode === "create") {
      const values = watch();
      return !!(
        values.title ||
        values.category ||
        values.description ||
        values.address ||
        bannerImages.images.length > 0
      );
    }

    const w = watch();
    const basicChanged =
      w.title !== initialValues?.title ||
      w.category !== initialValues?.category ||
      w.description !== initialValues?.description ||
      Number(w.price) !== Number(initialValues?.price) ||
      w.address !== initialValues?.address;

    const schedulesChanged =
      JSON.stringify(initialValues?.schedules) !==
      JSON.stringify(scheduleManager.schedules);

    const imagesChanged =
      bannerImages.images.some((img) => img.file) ||
      detailImages.images.some((img) => img.file) ||
      detailImages.images.length !== (initialValues?.subImageUrls?.length ?? 0);

    return basicChanged || schedulesChanged || imagesChanged;
  })();

  // 4. 이탈 방지 로직
  useEffect(() => {
    if (!hasChanges) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isExitingRef.current) return;
      e.preventDefault();
      e.returnValue = "";
    };

    const handlePopState = () => {
      if (isExitingRef.current) return;
      window.history.pushState(null, "", window.location.href);
      setShowExitModal(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasChanges, router]);

  const handleConfirmExit = () => {
    isExitingRef.current = true;
    setShowExitModal(false);
    setTimeout(() => {
      router.back();
    }, 100);
  };

  // 5. 제출 로직 (정제 로직 강화)
  const onValidSubmit = async (data: ExperienceFormValues) => {
    try {
      const bannerItem = bannerImages.images[0];
      const bannerImageUrl = bannerItem?.file
        ? await uploadActivityImage(bannerItem.file)
        : (bannerItem?.preview ?? "");

      const existingSubUrls = detailImages.images
        .filter((img) => !img.file)
        .map((img) => img.preview);

      const newDetailFiles = detailImages.images
        .filter((img) => !!img.file)
        .map((img) => img.file as File);

      const uploadedSubUrls = await Promise.all(
        newDetailFiles.map((f) => uploadActivityImage(f)),
      );
      const subImageUrls = [...existingSubUrls, ...uploadedSubUrls];

      const sanitizedSchedules = scheduleManager.schedules.map((s) => ({
        date: s.date.trim().substring(0, 10),
        startTime: s.startTime.trim().substring(0, 5),
        endTime: s.endTime.trim().substring(0, 5),
      }));

      const formData: ExperienceFormValues = {
        ...data,
        title: data.title.trim(),
        schedules: sanitizedSchedules,
        bannerImageUrl,
        subImageUrls,
      };

      if (mode === "create") {
        await postcreateFrom(TEAM_ID, mapFormToCreateActivity(formData));
        isExitingRef.current = true;
        setShowSuccessModal(true);
      } else {
        if (!originalData) return;

        const body = mapFormToUpdateActivity(originalData, formData);

        console.log("📦 [Final Patch Body]:", body);

        if (Object.keys(body).length === 0) {
          toast.error("변경사항이 없습니다.");
          return;
        }

        await patchupdateMyActivity(originalData.id, body);
        isExitingRef.current = true;
        setShowSuccessModal(true);
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        toast.error(
          "중복된 데이터가 존재합니다. 제목이나 시간대를 확인해 주세요.",
        );
      } else {
        toast.error(
          error instanceof ApiError
            ? error.message
            : "처리 중 오류가 발생했습니다.",
        );
      }
    }
  };

  return (
    <>
      <form
        className="flex lg:w-175 flex-col gap-6 pb-20"
        onSubmit={handleSubmit(onValidSubmit)}
      >
        <h1 className="text-18-b">
          {mode === "create" ? "내 체험 등록" : "내 체험 수정"}
        </h1>

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
                onChange={(val) => {
                  field.onChange(val);
                  trigger("category");
                }}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-16-b">설명</label>
          <textarea
            {...register("description", { required: "설명을 입력해 주세요" })}
            className="border p-4 rounded-xl h-40 resize-none outline-none focus:border-primary-500"
            placeholder="체험에 대한 설명을 입력해 주세요"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-16-b">가격</label>
          <Input
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-16-b">주소</label>
          <AddressInput value={addressValue} onChange={handleAddressChange} />
          <input
            type="hidden"
            {...register("address", { required: "주소를 입력해 주세요" })}
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

      <BasicModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.push(SUCCESS_REDIRECT_URL);
        }}
        text={
          mode === "create"
            ? "체험 등록이 완료되었습니다"
            : "체험 수정이 완료되었습니다"
        }
        buttonText="확인"
        onConfirm={() => {
          setShowSuccessModal(false);
          router.push(SUCCESS_REDIRECT_URL);
        }}
      />

      <AlertModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        text={"저장되지 않은 변경사항이 있습니다.\n정말 나가시겠습니까?"}
        cancelText="아니요"
        confirmText="네"
        onCancel={() => setShowExitModal(false)}
        onConfirm={handleConfirmExit}
      />
    </>
  );
}
