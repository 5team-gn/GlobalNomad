import { TIME_SLOTS } from "./constants/ReservationUI";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ReservationTimeFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-6">
      <label className="block text-18-b font-bold mb-3">
        예약 시간
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-13.5 appearance-none rounded-xl border border-gray-200 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          ▼
        </div>
      </div>
    </div>
  );
}