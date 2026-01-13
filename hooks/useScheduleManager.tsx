import { useState } from "react";

export interface ScheduleItem {
  date: string;
  startTime: string;
  endTime: string;
}

export function useScheduleManager(initialSchedules: ScheduleItem[] = []) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedules, setSchedules] =
    useState<ScheduleItem[]>(initialSchedules);

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
    setSchedules,

    isAddDisabled,

    addSchedule,
    removeSchedule,
  };
}
