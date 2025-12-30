"use client";

import { useState, useRef } from "react"; // 1. useRef 추가
import ArrowDown from "@/public/icon_arrow_down.svg";
import TimeDropdown from "./TimeDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  value: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
}

export default function TimeSelect({ value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null); 

  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between lg:w-30.5 border rounded-xl px-3 py-3 text-gray-400 cursor-pointer"
      >
        <span>{value || "0:00"}</span>
        <ArrowDown />
      </button>

      {open && (
        <TimeDropdown
          onSelect={(time) => {
            onChange?.(time);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}