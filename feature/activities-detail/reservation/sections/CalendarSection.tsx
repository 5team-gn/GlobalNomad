/**
 *
 *
 * @description 액티비티 상세 - 캘린더 섹션
 */
"use client";

import SimpleCalendar, { SimpleCalendarProps } from "../SimpleCalendar";

type Props = SimpleCalendarProps & {
  label?: string;
  labelClassName?: string;
};

export default function CalendarSection({
  label,
  labelClassName,
  value,
  onChange,
  enabledDateSet,
  onMonthNavigate,
}: Props) {
  return (
    <>
      {label ? <p className={labelClassName}>{label}</p> : null}
      <SimpleCalendar
        value={value}
        onChange={onChange}
        enabledDateSet={enabledDateSet}
        onMonthNavigate={onMonthNavigate}
      />
    </>
  );
}
