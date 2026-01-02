"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReservationSelection, ReservationStep, TimeSlot } from "@/types/reservation/types";

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

  const goBack = () => {
    if (step === "people") setStep("time");
    else if (step === "time") setStep("date");
    else if (step === "date") setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
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

  const goPeople = () => {
    if (selection.date && selection.timeSlot) setStep("people");
  };

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
