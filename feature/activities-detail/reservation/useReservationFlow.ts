/**
 *
 * @description 액티비티 상세 - 예약 플로우 훅
 *
 */

"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  ReservationSelection,
  ReservationStep,
  TimeSlot,
} from "@/types/reservation/types";

const MOCK_SLOTS: TimeSlot[] = [
  { id: "t1", label: "14:00~15:00" },
  { id: "t2", label: "15:00~16:00" },
];

export function useReservationFlow() {
  // 모달/시트 오픈 여부
  const [open, setOpen] = useState(false);

  // 예약 진행 단계(idle -> date -> time -> people -> done)
  const [step, setStep] = useState<ReservationStep>("idle");

  // 사용자 선택 상태
  const [selection, setSelection] = useState<ReservationSelection>({
    date: null,
    timeSlot: null,
    people: 1,
  });

  // 선택된 날짜에 따른 사용 가능한 시간대 목록(목업 데이터 사용)
  const availableSlots = useMemo(() => {
    return selection.date ? MOCK_SLOTS : [];
  }, [selection.date]);

  // 현재 단계에서 다음으로 진행할 수 있는지 여부
  const canConfirm = useMemo(() => {
    if (step === "date") return !!selection.date;
    if (step === "time") return !!selection.timeSlot;
    if (step === "people") return selection.people >= 1;
    return true;
  }, [step, selection]);

  // 예약 가능 여부(최종 확인용)
  const canReserve = useMemo(() => {
    return !!selection.date && !!selection.timeSlot && selection.people >= 1;
  }, [selection]);

  // 특정 단계로 오픈(단계 초기화 없이)
  const openFor = (next: ReservationStep) => {
    setOpen(true);
    setStep(next);
  };

  const close = () => setOpen(false);

  // 상태 초기화
  const reset = () => {
    setOpen(false);
    setStep("idle");
    setSelection({ date: null, timeSlot: null, people: 1 });
  };

  // 날짜 선택: 날짜가 바뀌면 기존 시간 선택은 무효 처리
  const setDate = (d: Date) => {
    setSelection((prev) => ({
      ...prev,
      date: d,
      timeSlot: null,
    }));
  };

  // 시간대 선택
  const setTimeSlot = (slot: TimeSlot) => {
    setSelection((prev) => ({ ...prev, timeSlot: slot }));
  };

  // 인원 증가(최대값 지정 가능, 기본 10명)
  const incPeople = (max = 10) => {
    setSelection((prev) => ({
      ...prev,
      people: Math.min(max, prev.people + 1),
    }));
  };

  //  인원 감소(최소 1명)
  const decPeople = () => {
    setSelection((prev) => ({
      ...prev,
      people: Math.max(1, prev.people - 1),
    }));
  };

  // 다음 단계로 이동
  // - date -> time
  // - time -> people
  // - people -> done(모달/시트 닫기)
  const goNext = () => {
    setSelection((sel) => {
      setStep((prevStep) => {
        if (prevStep === "date") return sel.date ? "time" : prevStep;
        if (prevStep === "time") return sel.timeSlot ? "people" : prevStep;
        if (prevStep === "people") {
          setOpen(false);
          return "done";
        }
        return prevStep;
      });
      return sel;
    });
  };

  // 이전 단계로 이동
  // - people -> time
  // - time -> date
  // - date -> 닫기
  const goBack = () => {
    if (step === "people") setStep("time");
    else if (step === "time") setStep("date");
    else if (step === "date") setOpen(false);
  };

  // 모달/시트 오픈 시 바디 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // pc로 전환되면 모바일 시트를 닫고 상태를 초기화
  // resize 시 모바일 UI가 남아있는 것을 방지
  useEffect(() => {
    // 리사이즈 감지용 미디어쿼리
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = () => {
      if (mq.matches) {
        setOpen(false);
        document.body.style.overflow = "";
        setStep("idle");
      }
    };
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // 인원 선택 단계로 이동(날짜, 시간대가 선택된 경우에만)
  const goPeople = () => {
    if (selection.date && selection.timeSlot) setStep("people");
  };

  // 모바일에서 날짜 선택 단계로 이동
  const goBackMobile = () => {
    setStep("date");
  };

  return {
    open,
    step,
    selection,
    availableSlots,
    canConfirm,
    canReserve,
    openFor,
    close,
    reset,
    setDate,
    setTimeSlot,
    incPeople,
    decPeople,
    goNext,
    goBack,
    goPeople,
    goBackMobile,
  };
}
