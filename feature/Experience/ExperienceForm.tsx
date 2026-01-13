"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import CategorySelect from "@/components/dropdown/CategorySelect";
import { BasicModal, AlertModal } from "@/components/modal"; // 모달 추가

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

const CATEGORY_OPTIONS = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

export default function ExperienceForm({ mode, initialValues, originalData }: Props) {
  const router = useRouter();
  const SUCCESS_REDIRECT_URL = "/myinfo?menu=MY_EXPERIENCE";

  // --- 1. 모달 및 이탈 방지 상태 (RegisterActivityPage에서 추출) ---
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

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

  // 초기값 세팅 (수정 모드)
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
  const bannerImages = useImageManager(initialValues?.bannerImageUrl ? [initialValues.bannerImageUrl] : []);
  const detailImages = useImageManager(initialValues?.subImageUrls ?? []);

  useEffect(() => {
    setValue("bannerImageUrl", bannerImages.images[0]?.preview ?? "");
    setValue("schedules", scheduleManager.schedules);
  }, [bannerImages.images, scheduleManager.schedules, setValue]);

  // --- 2. 변경 감지 로직 (수정 여부 확인) ---
  const hasChanges = (() => {
    if (mode === "create") {
      // 등록 모드에서는 하나라도 입력값이 있으면 Dirty로 간주
      const values = watch();
      return !!(values.title || values.category || values.description || values.address || bannerImages.images.length > 0);
    }
    
    // 수정 모드에서의 비교 로직
    const w = watch();
    const basicChanged = 
      w.title !== initialValues?.title ||
      w.category !== initialValues?.category ||
      w.description !== initialValues?.description ||
      Number(w.price) !== Number(initialValues?.price) ||
      w.address !== initialValues?.address;

    const schedulesChanged = JSON.stringify(initialValues?.schedules) !== JSON.stringify(scheduleManager.schedules);
    const bannerChanged = bannerImages.images.some(img => img.file);
    const imagesChanged = bannerChanged || detailImages.images.some(img => img.file) || detailImages.images.length !== (initialValues?.subImageUrls?.length ?? 0);

    return basicChanged || schedulesChanged || imagesChanged;
  })();

  // --- 3. 이탈 방지 Effect (RegisterActivityPage 기능 통합) ---
  useEffect(() => {
    if (!hasChanges) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const handlePopState = () => {
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
  }, [hasChanges]);

  // --- 4. Submit 핸들러 ---
  const onValidSubmit = async (data: ExperienceFormValues) => {
    try {
      const bannerItem = bannerImages.images[0];
      const bannerImageUrl = bannerItem?.file 
        ? await uploadActivityImage(bannerItem.file) 
        : initialValues?.bannerImageUrl ?? "";

      if (!bannerImageUrl) {
        toast.error("배너 이미지를 등록해 주세요.");
        return;
      }

      const existingSubUrls = mode === "edit" ? detailImages.images.filter(img => !img.file).map(img => img.preview as string) : [];
      const newDetailFiles = detailImages.images.map(img => img.file).filter((f): f is File => !!f);
      const uploadedSubUrls = await Promise.all(newDetailFiles.map(f => uploadActivityImage(f)));
      const subImageUrls = [...existingSubUrls, ...uploadedSubUrls];

      const formData = { ...data, schedules: scheduleManager.schedules, bannerImageUrl, subImageUrls };

      if (mode === "create") {
        const body = mapFormToCreateActivity(formData);
        await postcreateFrom(TEAM_ID, body);
        setShowSuccessModal(true); // 성공 시 모달 오픈
      } else {
        if (!originalData) return;
        const body = mapFormToUpdateActivity(originalData, formData);
        await patchupdateMyActivity(originalData.id, body);
        setShowSuccessModal(true); // 수정 시 모달 오픈
      }
    } catch (error) {
      toast.error("처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <form className="flex lg:w-175 flex-col gap-6 pb-20" onSubmit={handleSubmit(onValidSubmit)}>
        <h1 className="text-18-b">{mode === "create" ? "내 체험 등록" : "내 체험 수정"}</h1>

        <div className="flex flex-col gap-2">
          <label className="text-16-b">제목</label>
          <Input {...register("title", { required: "제목을 입력해 주세요" })} placeholder="제목을 입력해 주세요" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
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
                onChange={(val) => { field.onChange(val); trigger("category"); }}
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
          <Input type="number" {...register("price", { required: true, valueAsNumber: true })} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-16-b">주소</label>
          <AddressInput value={addressValue} onChange={(val) => setValue("address", val, { shouldValidate: true })} />
          <input type="hidden" {...register("address", { required: "주소를 입력해 주세요" })} />
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

        <Button type="submit" variant="primary" disabled={isSubmitting || (mode === "edit" && !hasChanges)}>
          {isSubmitting ? "처리 중..." : mode === "create" ? "등록하기" : "수정하기"}
        </Button>
      </form>

      {/* --- RegisterActivityPage에서 가져온 모달들 --- */}
      <BasicModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.push(SUCCESS_REDIRECT_URL); // 등록/수정 후 목록으로 이동
        }}
        text={mode === "create" ? "체험 등록이 완료되었습니다" : "체험 수정이 완료되었습니다"}
        buttonText="확인"
        onConfirm={() => router.push(SUCCESS_REDIRECT_URL)}
      />

      <AlertModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        text={"저장되지 않은 변경사항이 있습니다.\n정말 나가시겠습니까?"}
        cancelText="아니요"
        confirmText="네"
        onCancel={() => setShowExitModal(false)}
        onConfirm={() => {
          setShowExitModal(false);
          router.back(); // 실제 뒤로가기 실행
        }}
      />
    </>
  );
}