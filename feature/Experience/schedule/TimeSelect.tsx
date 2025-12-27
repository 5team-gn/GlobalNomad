"use client";

import { useState } from "react";
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

  return (
    <div className="relative">
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
