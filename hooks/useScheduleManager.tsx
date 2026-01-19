"use client";

import { useState, useCallback } from "react";

export interface ScheduleItem {
  date: string;
  startTime: string;
  endTime: string;
}

export function useScheduleManager(initialSchedules: ScheduleItem[] = []) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedules);

  const initSchedules = useCallback((newSchedules: ScheduleItem[]) => {
    setSchedules(newSchedules);
  }, []);

  // 🔴 개선된 시간 계산 함수 (초 단위나 공백이 있어도 안전하게 처리)
  const toMinutes = (time: string) => {
    if (!time) return 0;
    // "09:00:00" 처럼 초가 붙어있을 경우를 대비해 앞의 두 섹션만 사용
    const [h, m] = time.trim().split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const isOverlappingSchedule = (newItem: ScheduleItem) => {
    const newStart = toMinutes(newItem.startTime);
    const newEnd = toMinutes(newItem.endTime);

    console.group("🔍 스케줄 중복 검사 디버깅");
    console.log("추가하려는 항목:", newItem);
    console.log(`계산된 분(Minutes): ${newStart}m ~ ${newEnd}m`);

    const duplicateItem = schedules.find((item) => {
      // 1. 날짜 비교 로그
      const isSameDate = item.date === newItem.date;

      if (!isSameDate) return false;

      const existStart = toMinutes(item.startTime);
      const existEnd = toMinutes(item.endTime);

      // 2. 시간 겹침 계산 로그
      const overlap = newStart < existEnd && newEnd > existStart;

      if (overlap) {
        console.log("❌ 중복 발견!");
        console.log("기존 항목:", item);
        console.log(`기존 분(Minutes): ${existStart}m ~ ${existEnd}m`);
        console.log(
          `판정 이유: (${newStart} < ${existEnd}) AND (${newEnd} > ${existStart})`
        );
      }

      return overlap;
    });

    console.groupEnd();
    return !!duplicateItem;
  };

  const isAddDisabled =
    !date ||
    !startTime ||
    !endTime ||
    toMinutes(endTime) <= toMinutes(startTime);

  const addSchedule = () => {
    if (isAddDisabled) return;

    // 🔴 중요: 추가할 때 형식을 "HH:mm"으로 확실히 고정
    const newSchedule = {
      date,
      startTime: startTime.substring(0, 5),
      endTime: endTime.substring(0, 5),
    };

    if (isOverlappingSchedule(newSchedule)) {
      alert("같은 날짜에 겹치는 시간대가 이미 존재합니다.");
      return;
    }

    setSchedules((prev) => [...prev, newSchedule]);
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  const removeSchedule = (index: number) => {
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    date,
    startTime,
    endTime,
    schedules,
    setDate,
    setStartTime,
    setEndTime,
    initSchedules,
    isAddDisabled,
    addSchedule,
    removeSchedule,
  };
}
