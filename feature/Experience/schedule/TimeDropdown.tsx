"use client";

interface Props {
  onSelect: (time: string) => void;
}

const TIMES = Array.from({ length: 24 * 2 }, (_, i) => {
  const hour = Math.floor(i / 2)
    .toString()
    .padStart(2, "0");
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

export default function TimeDropdown({ onSelect }: Props) {
  return (
    <ul
      className="absolute z-50 mt-2 w-24 rounded-xl border bg-white shadow-md max-h-48 overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {TIMES.map((time) => (
        <li key={time}>
          <button
            type="button"
            onClick={() => onSelect(time)}
            className="w-full px-3 py-2 text-left hover:bg-gray-100"
          >
            {time}
          </button>
        </li>
      ))}
    </ul>
  );
}
