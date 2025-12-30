"use client";

import { cn } from "@/lib/utils/twmerge";
import DateInput from "./DateInput";
import TimeSelect from "./TimeSelect";

import PlusIcon from "@/public/icon_plus.svg"
import MinusIcon from "@/public/icon_minus.svg"


interface Props {
  date: string;
  startTime: string;
  endTime: string;

  actionType: "add" | "remove";
  disabled?: boolean;
  addDisabled?: boolean;

  onAction: () => void;
  onDateChange?: (date: string) => void;
  onStartTimeChange?: (time: string) => void;
  onEndTimeChange?: (time: string) => void;
}

export default function ScheduleRow({
  date,
  startTime,
  endTime,
  actionType,
  disabled = false,
  addDisabled,
  onAction,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: Props) {
  return (
    <div className="flex items-center gap-3 w-full">
      {/* DateInput: 직접 입력 가능 + 달력 버튼 */}
      <DateInput value={date} onChange={onDateChange} disabled={disabled} />

      {/* 시작 시간 */}
      <div className="flex lg:w-67.5 gap-2 items-center">

      <TimeSelect
        value={startTime}
        onChange={onStartTimeChange}
        disabled={disabled}
      />

      <span>-</span>

      {/* 종료 시간 */}
      <TimeSelect
        value={endTime}
        onChange={onEndTimeChange}
        disabled={disabled}
      />
      </div>

      {/* 추가/삭제 버튼 */}
      <button
        type="button"
        onClick={onAction}
        disabled={actionType === "add" ? addDisabled : false}
        className={cn(
          "lg:w-10.5 lg:h-10.5 rounded-full flex items-center justify-center text-lg cursor-pointer ",
          actionType === "add"
            ? addDisabled
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-primary-500 text-white"
            : "bg-gray-50 text-black hover:bg-red-500/70"
        )}
      >
        {actionType === "add" ? <PlusIcon/> : <MinusIcon/>}
      </button>
    </div>
  );
}
