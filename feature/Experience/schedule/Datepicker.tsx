"use client";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/locale"


interface Props {
  onSelect: (date: string) => void;
}

export default function DatePicker({ onSelect }: Props) {
  return (
    <div className="bg-white border rounded-xl shadow-lg overflow-hidden inline-block border-gray-200">
      <ReactDatePicker
        inline
        locale={ko}
        minDate={new Date()}
        onChange={(date: Date | null) => {
          if (date) {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            onSelect(`${y}-${m}-${d}`);
          }
        }}
      />
    </div>
  );
}