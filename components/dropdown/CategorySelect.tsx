"use client";

import { useState, useRef } from "react";
import ArrowDown from "@/public/icon_arrow_down.svg";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEsc } from "@/hooks/useEsc";

interface CategorySelectProps {
  options: string[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({
  options,
  value,
  placeholder = "전체",
  onChange,
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  useEsc(() => setOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full h-13.5 border rounded-xl px-5 flex justify-between items-center"
      >
        <span className={value ? "text-gray-900" : ""}>
          {value || placeholder}
        </span>
        <ArrowDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* 드롭다운 */}
      {open && (
        <ul className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow">
          {/* ✅ 전체 옵션 */}
          <li
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="px-5 py-3 hover:bg-gray-25 cursor-pointer "
          >
            {placeholder}
          </li>

          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="px-5 py-3 hover:bg-gray-25 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
