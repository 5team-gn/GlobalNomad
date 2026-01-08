import { ButtonLabel } from "@/components/button/Button";
import type { ReservationStatus } from "@/types/reservationview.types";
import { STATUS_STYLE } from "./ReservationView.constants";

const FILTER_LABEL: Record<ReservationStatus, string> = {
  pending: "예약 신청",
  canceled: "예약 취소",
  confirmed: "예약 승인",
  declined: "예약 거절",
  completed: "체험 완료",
};

interface Props {
  value: ReservationStatus;
  onChange: (status: ReservationStatus) => void;
}

export function ReservationFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-7.5">
      {Object.entries(FILTER_LABEL).map(([key, label]) => {
        const isActive = value === key;
        return (
          <ButtonLabel
            key={key}
            onClick={(e) => {
              onChange(key as ReservationStatus);
              e.currentTarget.blur();
            }}
            label={label}
            variant={isActive ? "primary" : "secondary"}
            size="md"
            className={`
              w-[90px] h-[39px] px-4 py-[10px] rounded-full
              ${!isActive ? "hover:bg-gray-100" : ""}
              ${
                !isActive
                  ? "focus-visible:bg-gray-100 focus-visible:border-gray-200"
                  : ""
              }
              focus-visible:outline-none
              ${
                !isActive
                  ? "active:!bg-transparent active:!border-gray-200"
                  : ""
              }
              [&>span]:select-none [&>span]:pointer-events-none
              ${
                isActive
                  ? `${
                      STATUS_STYLE[key as ReservationStatus].badge
                    } !border-transparent`
                  : ""
              }
            `}
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
            onMouseDown={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        );
      })}
    </div>
  );
}
