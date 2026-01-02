// CalendarHeader.tsx
import ArrowLeft from "@/public/icon_arrow_left.svg"
import ArrowRight from "@/public/icon_arrow_right.svg"

interface Props {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-8 mb-8 cursor-pointer">
      <button onClick={onPrev} className="cursor-pointer">
        <ArrowLeft className="text-gray-600" />
      </button>

      <h2 className="text-20-b">
        {year}년 {month + 1}월
      </h2>

      <button onClick={onNext} className="cursor-pointer">
        <ArrowRight className="text-gray-600" />
      </button>
    </div>
  );
}
