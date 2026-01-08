"use client";

import { useState, useRef, useId } from "react";
import ArrowDown from "@/public/icon_arrow_down.svg";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEsc } from "@/hooks/useEsc";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation"; // 훅 경로 확인

interface CategorySelectProps {
  id?: string | number
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
  const listboxId = useId();

  // 모든 옵션을 하나의 배열로 관리 (인덱스 계산용)
  const allOptions = ["", ...options];

  // ✅ 공통 선택 로직
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
  };

  // ✅ 키보드 네비게이션 적용
  const { activeIndex, handleKeyDown } = useKeyboardNavigation({
    itemCount: allOptions.length,
    isOpen: open,
    setIsOpen: setOpen,
    onSelect: (index) => handleSelect(allOptions[index]), // handleSelect 재사용
  });

  useClickOutside(dropdownRef, () => setOpen(false));
  useEsc(() => setOpen(false));

  return (
    <div 
      className="relative" 
      ref={dropdownRef} 
      onKeyDown={handleKeyDown} // 키보드 이벤트 감지
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full h-13.5 border rounded-xl px-5 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ArrowDown className={`transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow py-2"
        >
          {allOptions.map((option, index) => (
            <li
              key={index}
              role="option"
              aria-selected={value === option}
              onClick={() => handleSelect(option)} // handleSelect 재사용
              className={`px-5 py-3 cursor-pointer transition-colors ${
                activeIndex === index ? "bg-gray-100" : "hover:bg-gray-25"
              }`}
            >
              {option || placeholder}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}