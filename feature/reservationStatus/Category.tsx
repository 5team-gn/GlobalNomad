"use client";

import { Reservation } from "./types/reservation";

interface Props {
  reservations: Reservation[];
  selectedTitle: string | null;
  onChange: (title: string | null) => void;
}

export default function Category({
  reservations,
  selectedTitle,
  onChange,
}: Props) {
  const titles = Array.from(new Set(reservations.map((r) => r.title)));

  return (
    <select
      value={selectedTitle ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
      className="w-full h-13.5 border border-gray-100 rounded px-5 py-4 shadow"
    >
      <option value="">전체</option>
      {titles.map((title) => (
        <option key={title} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
}
