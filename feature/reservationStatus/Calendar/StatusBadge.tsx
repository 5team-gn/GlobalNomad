interface StatusBadgeProps {
  status: "예약" | "승인" | "완료";
  count: number;
}

export function StatusBadge({ status, count }: StatusBadgeProps) {
  const styleMap = {
    예약: "bg-blue-50 text-blue-500",
    승인: "bg-orange-50 text-orange-500",
    완료: "bg-gray-100 text-gray-500",
  };

  return (
    <div
      className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${styleMap[status]}`}
    >
      {status} {count}
    </div>
  );
}

