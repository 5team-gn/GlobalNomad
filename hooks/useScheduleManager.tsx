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

  // 추가: 외부에서 받아온 데이터를 매니저 상태로 강제 주입하는 함수
  // useCallback을 사용하여 무한 루프를 방지합니다.
  const initSchedules = useCallback((newSchedules: ScheduleItem[]) => {
    setSchedules(newSchedules);
  }, []);

  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const isOverlappingSchedule = (newItem: ScheduleItem) => {
    const newStart = toMinutes(newItem.startTime);
    const newEnd = toMinutes(newItem.endTime);

    return schedules.some((item) => {
      if (item.date !== newItem.date) return false;
      const existStart = toMinutes(item.startTime);
      const existEnd = toMinutes(item.endTime);
      return newStart < existEnd && newEnd > existStart;
    });
  };

  const isAddDisabled =
    !date ||
    !startTime ||
    !endTime ||
    toMinutes(endTime) <= toMinutes(startTime);

  const addSchedule = () => {
    if (isAddDisabled) return;
    const newSchedule = { date, startTime, endTime };

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
    initSchedules, // setSchedules 대신 이걸 사용하세요
    isAddDisabled,
    addSchedule,
    removeSchedule,
  };
}