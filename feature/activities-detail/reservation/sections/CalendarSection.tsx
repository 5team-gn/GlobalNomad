/**
 *
 *
 * @description 액티비티 상세 - 캘린더 섹션
 */
"use client";

import SimpleCalendar from "../SimpleCalendar";

type Props = {
  label?: string;
  labelClassName?: string;
  value: Date | null;
  onChange: (d: Date) => void;
  enabledDateSet: Set<string>;
};

export default function CalendarSection({
  label,
  labelClassName,
  value,
  onChange,
  enabledDateSet,
}: Props) {
  return (
    <>
      {label ? <p className={labelClassName}>{label}</p> : null}
      <SimpleCalendar
        value={value}
        onChange={onChange}
        enabledDateSet={enabledDateSet}
      />
    </>
  );
}
