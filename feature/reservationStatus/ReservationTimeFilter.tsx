"use client";

interface TimeOption {
  label: string; // "09:00 ~ 10:00"
  value: number; // scheduleId
}

interface Props {
  value: number | null; // string에서 number | null로 변경
  onChange: (value: number) => void; // string에서 number로 변경
  options: TimeOption[]; // 외부에서 옵션을 받음
}

export default function ReservationTimeFilter({
  value,
  onChange,
  options,
}: Props) {
  return (
    <div className="mb-6">
      <label className="block text-18-b font-bold mb-3">
        예약 시간
      </label>

      <div className="relative">
        <select
          // select의 value는 문자열로 처리되므로 숫자를 문자열로 변환
          value={value ?? ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full min-h-13.5 appearance-none rounded-xl border border-gray-200 px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.length === 0 && <option value="">시간대 없음</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          ▼
        </div>
      </div>
    </div>
  );
}