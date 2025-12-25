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
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<ReservationStep>("idle");
  const [selection, setSelection] = useState<ReservationSelection>({
    date: null,
    timeSlot: null,
    people: 1,
  });

  const availableSlots = useMemo(() => {
    return selection.date ? MOCK_SLOTS : [];
  }, [selection.date]);

  const canConfirm = useMemo(() => {
    if (step === "date") return !!selection.date;
    if (step === "time") return !!selection.timeSlot;
    if (step === "people") return selection.people >= 1;
    return true;
  }, [step, selection]);

  const canReserve = useMemo(() => {
    return !!selection.date && !!selection.timeSlot && selection.people >= 1;
  }, [selection]);

  const openFor = (next: ReservationStep) => {
    setOpen(true);
    setStep(next);
  };

  const close = () => setOpen(false);

  const reset = () => {
    setOpen(false);
    setStep("idle");
    setSelection({ date: null, timeSlot: null, people: 1 });
  };

  const setDate = (d: Date) => {
    setSelection((prev) => ({
      ...prev,
      date: d,
      // 날짜 바꾸면 시간 선택 초기화
      timeSlot: null,
    }));
  };

  const setTimeSlot = (slot: TimeSlot) => {
    setSelection((prev) => ({ ...prev, timeSlot: slot }));
  };

  const incPeople = (max = 10) => {
    setSelection((prev) => ({
      ...prev,
      people: Math.min(max, prev.people + 1),
    }));
  };

  const decPeople = () => {
    setSelection((prev) => ({ ...prev, people: Math.max(1, prev.people - 1) }));
  };

  const goNext = () => {
    if (step === "date" && selection.date) setStep("time");
    else if (step === "time" && selection.timeSlot) setStep("people");
    else if (step === "people") {
      // 최종 확정
      setStep("done");
      setOpen(false);
    }
  };

  const goBack = () => {
    if (step === "people") setStep("time");
    else if (step === "time") setStep("date");
    // date에서는 뒤로갈 곳 없으면 close하거나 idle로 보내고 싶으면 여기서 처리
    else if (step === "date") setOpen(false);
  };

  // 열렸을 때 body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
  };
}
