export interface CalendarDate {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function getMonthCalendar(year: number, month: number): CalendarDate[] {
  const result: CalendarDate[] = [];
  const today = new Date();
  const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDayOfWeek = firstDayOfMonth.getDay(); 
  const totalDays = lastDayOfMonth.getDate();

  for (let i = startDayOfWeek; i > 0; i--) {
    const date = new Date(year, month, 1 - i);
    result.push(formatDateObject(date, false, todayReset));
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    result.push(formatDateObject(date, true, todayReset));
  }

  const remainingSlots = 7 - (result.length % 7);
  if (remainingSlots < 7) {
    for (let i = 1; i <= remainingSlots; i++) {
      const date = new Date(year, month + 1, i);
      result.push(formatDateObject(date, false, todayReset));
    }
  }

  return result;
}

// 헬퍼 함수: 반복적인 객체 생성을 깔끔하게 분리
function formatDateObject(date: Date, isCurrentMonth: boolean, todayTime: number): CalendarDate {
  return {
    date,
    day: date.getDate(),
    isCurrentMonth,
    isToday: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() === todayTime,
  };
}