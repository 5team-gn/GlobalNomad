/**
 *
 *
 * @description 액티비티 상세 - 캘린더
 */
"use client";

import { useState } from "react";
import {
  DayPicker,
  type DayButtonProps,
  type MonthCaptionProps,
  type NavProps,
} from "react-day-picker";
import Image from "next/image";
import { toISODate } from "@/utils/date";

export type SimpleCalendarProps = {
  value: Date | null;
  onChange: (d: Date) => void;
  enabledDateSet: Set<string>;
  onMonthNavigate?: (nextMonth: Date) => void;
};

export default function SimpleCalendar({
  value,
  onChange,
  enabledDateSet,
  onMonthNavigate,
}: SimpleCalendarProps) {
  // "오늘" 기준을 컴포넌트 마운트 시점으로 고정 (렌더마다 new Date() 재생성 방지)
  const [today] = useState(() => new Date());

  // 현재 보고 있는 월(1일 기준)
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // 활성화된 날짜인지
  const isEnabled = (d: Date) => enabledDateSet.has(toISODate(d));
  // 오늘인지
  const isToday = (d: Date) => toISODate(d) === toISODate(today);
  // 선택된 날짜인지
  const isSelected = (d: Date) =>
    value ? toISODate(d) === toISODate(value) : false;

  const formatWeekdayKo = (d: Date) =>
    ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];

  return (
    <div className="w-full">
      <DayPicker
        mode="single"
        showOutsideDays
        month={month}
        onMonthChange={(nextMonth) => {
          setMonth(nextMonth);
          onMonthNavigate?.(nextMonth);
        }}
        selected={value ?? undefined}
        onSelect={(d) => {
          if (!d) return;
          if (!isEnabled(d)) return;
          onChange(d);
        }}
        formatters={{ formatWeekdayName: formatWeekdayKo }}
        modifiers={{
          available: (d) => isEnabled(d),
          todayDisabled: (d) => isToday(d) && !isEnabled(d),
        }}
        classNames={{
          root: "w-full relative",
          months: "w-full",
          month: "w-full",
          caption: "mt-2",
          caption_label: "text-16-m text-gray-950",
          month_grid: "w-full border-separate border-spacing-y-1",
          row: "w-full",
          cell: "p-0 text-center align-middle",
          head_row: "w-full",
          head_cell: "p-0 align-middle text-gray-800 text-14-m font-normal",
          // 요일 줄(헤더) 높이
          weekday: "h-[54px] md:h-[73px] lg:h-[54px] md:py-[13px]",
          // 날짜 버튼 높이
          day: "h-[54px] md:h-[73px] lg:h-[54px] p-0 py-[4px] md:py-[13px] lg:py-[4px] text-center align-middle",
          outside: "",
          day_outside: "",
          disabled: "",
        }}
        components={{
          MonthCaption: (props: MonthCaptionProps) => {
            // 현재 월의 날짜 객체
            const date = (props.calendarMonth as unknown as { date: Date })
              ?.date;

            // 월 년도 라벨
            const label = date
              ? date.toLocaleString("en-US", { month: "long", year: "numeric" })
              : "";

            return (
              <div className="relative lg:mt-2 flex items-center h-8 md:mb-1">
                <p className="text-16-m text-gray-950">{label}</p>
              </div>
            );
          },

          Nav: ({
            onPreviousClick,
            onNextClick,
            previousMonth,
            nextMonth,
          }: NavProps) => {
            return (
              <div className="flex justify-end absolute right-0 top-1 z-10">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={(e) => onPreviousClick?.(e)}
                    disabled={!previousMonth}
                    className="h-6 w-6 rounded-lg flex items-center justify-center disabled:opacity-40 cursor-pointer"
                    aria-label="Previous month"
                  >
                    <Image
                      src="/icons/icon_arrow_left.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => onNextClick?.(e)}
                    disabled={!nextMonth}
                    className="h-6 w-6 rounded-lg flex items-center justify-center disabled:opacity-40 cursor-pointer"
                    aria-label="Next month"
                  >
                    <Image
                      src="/icons/icon_arrow_right.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            );
          },

          DayButton: (props: DayButtonProps) => {
            // 날짜 객체
            const day = props.day.date;

            // 날짜가 달력 밖에 있는지
            const outside = !!props.modifiers?.outside;
            // 날짜 상태
            const enabled = isEnabled(day);
            // 선택된 날짜인지
            const selected = isSelected(day);
            // 오늘이지만 비활성화된 날짜인지
            const todayDisabled = isToday(day) && !enabled;

            const baseText = outside ? "text-gray-300" : "text-gray-800";

            // 상태에 따른 스타일 우선순위: 선택 > 가능일 > (오늘이지만 불가) > 기본
            const stateCls = selected
              ? "bg-primary-500 text-white opacity-50 "
              : enabled
              ? "bg-primary-500 text-white hover:bg-primary-600"
              : todayDisabled
              ? "bg-primary-100 text-primary-500"
              : "";

            return (
              <button
                {...props}
                disabled={!enabled}
                className={[
                  "mx-auto inline-flex items-center justify-center",
                  "h-full w-[46px]",
                  "rounded-full text-16-m overflow-hidden",
                  baseText,
                  stateCls,
                  enabled ? "cursor-pointer" : "cursor-not-allowed",
                ].join(" ")}
              />
            );
          },
        }}
      />
    </div>
  );
}
