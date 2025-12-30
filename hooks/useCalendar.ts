import { useState } from "react";

export function useCalendar(initialYear: number, initialMonth: number) {
  const [current, setCurrent] = useState({
    year: initialYear,
    month: initialMonth,
  });

  const changeMonth = (delta: number) => {
    setCurrent((prev) => {
      const date = new Date(prev.year, prev.month + delta, 1);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
      };
    });
  };

  return {
    year: current.year,
    month: current.month,
    prevMonth: () => changeMonth(-1),
    nextMonth: () => changeMonth(1),
  };
}
