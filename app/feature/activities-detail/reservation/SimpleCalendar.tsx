"use client";
import "../../../../style/global.css";
import { useMemo, useState } from "react";
import {
  DayPicker,
  type DayButtonProps,
  type NavProps,
  type MonthCaptionProps,
} from "react-day-picker";
import { toISODate } from "@/utils/date";
import Image from "next/image";

type Props = {
  value: Date | null;
  onChange: (d: Date) => void;
  enabledDateSet: Set<string>;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function SimpleCalendar({
  value,
  onChange,
  enabledDateSet,
}: Props) {
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const isEnabled = (d: Date) => enabledDateSet.has(toISODate(d));
  const isToday = (d: Date) => toISODate(d) === toISODate(today);
  const isSelected = (d: Date) =>
    value ? toISODate(d) === toISODate(value) : false;

  const weekday1 = (d: Date) =>
    ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];

  return (
    <div className="w-full">
      <DayPicker
        mode="single"
        showOutsideDays
        month={month}
        onMonthChange={setMonth}
        selected={value ?? undefined}
        onSelect={(d) => {
          if (!d) return;
          if (!isEnabled(d)) return;
          onChange(d);
        }}
        formatters={{ formatWeekdayName: weekday1 }}
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
          cell: "p-0 text-center align-middle ",
          head_row: "w-full ",
          head_cell: " p-0 align-middle text-gray-800 text-14-m font-normal",

          weekday: " md:py-[13px]h-[54px] md:h-[73px] lg:h-[54px]",
          day: "h-[54px] md:h-[73px] lg:h-[54px] p-0 py-[4px] md:py-[13px] lg:py-[4px] text-center align-middle",
          outside: "",
          day_outside: "",
          disabled: "",
        }}
        components={{
          MonthCaption: (props: MonthCaptionProps) => {
            const date = (props.calendarMonth as any)?.date as Date;
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
              <div className="flex justify-end absolute right-0 top-1 z-1">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={(e) => onPreviousClick?.(e)}
                    disabled={!previousMonth}
                    className="h-6 w-6 rounded-lg flex items-center justify-center disabled:opacity-40  cursor-pointer"
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
                    className="h-6 w-6 rounded-lg flex items-center justify-center disabled:opacity-40  cursor-pointer"
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
            const d = props.day.date;

            const outside = !!props.modifiers?.outside;
            const enabled = isEnabled(d);
            const selected = isSelected(d);
            const todayDisabled = isToday(d) && !enabled;

            const baseText = outside ? "text-gray-300" : "text-gray-800";

            const stateCls = selected
              ? "bg-primary-500 text-white"
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
                  // ✅ block 제거, inline-flex로
                  "mx-auto inline-flex items-center justify-center",
                  "h-[100%] w-[46px]",
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
