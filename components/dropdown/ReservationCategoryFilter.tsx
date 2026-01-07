"use client";
import CategorySelect from "./CategorySelect";
import { Reservation } from "@/feature/reservationStatus/types/reservation";

interface Props {
  reservations: Reservation[];
  selectedTitle: string | null;
  onChange: (title: string | null) => void;
}

export default function ReservationCategoryFilter({
  reservations,
  selectedTitle,
  onChange,
}: Props) {
  const titles = Array.from(new Set(reservations.map((r) => r.title)));

  return (
    <CategorySelect
      options={titles}
      value={selectedTitle ?? ""}
      placeholder="전체"
      onChange={(value) => onChange(value=== "" ? null : value)}
    />
  );
}
