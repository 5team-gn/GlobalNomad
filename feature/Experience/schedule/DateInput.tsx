"use client";
import { useState, useRef } from "react";
import CalendarIcon from "@/public/icon_calendar.svg";
import DatePicker from "./Datepicker";
import { Input } from "@/components/common/input";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  value: string;
  onChange?: (date: string) => void;
  disabled?: boolean;
}

export default function DateInput({ value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    
    const limitedValue = rawValue.slice(0, 6);
    
    let formattedValue = "";
    if (limitedValue.length <= 2) {
      formattedValue = limitedValue;
    } else if (limitedValue.length <= 4) {
      formattedValue = `${limitedValue.slice(0, 2)}/${limitedValue.slice(2)}`;
    } else {
      formattedValue = `${limitedValue.slice(0, 2)}/${limitedValue.slice(2, 4)}/${limitedValue.slice(4)}`;
    }

    onChange?.(formattedValue);
  };

  return (
    
    <div className="relative w-90" ref={ref}>
    
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="yy/mm/dd"
        disabled={disabled}
        className="  border rounded-xl px-4 py-3 pr-10 text-gray-700"
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="absolute right-1 top-1/2 -translate-y-1/2 p-2 flex items-center justify-center cursor-pointer"
      >
        <CalendarIcon />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full">
          <DatePicker
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
