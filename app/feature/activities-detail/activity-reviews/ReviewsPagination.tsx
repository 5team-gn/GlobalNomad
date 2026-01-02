"use client";

import clsx from "clsx";
import Image from "next/image";
const ICON_ACTIVE = "/icons/icon_page_right.svg";
const ICON_DISABLED = "/icons/icon_page_left.svg";

type Props = {
  page: number; // 1-based
  totalPages: number;
  onChange: (nextPage: number) => void;
  className?: string;
};

export default function ReviewsPagination({
  page,
  totalPages,
  onChange,
  className,
}: Props) {
  if (totalPages <= 1) return null;

  // 가운데 5개 정도 보이게
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);

  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav className={clsx("flex items-center justify-center gap-1", className)}>
      {/* Prev */}
      <button
        type="button"
        onClick={() => canPrev && onChange(page - 1)}
        disabled={!canPrev}
        aria-label="이전 페이지"
        className={clsx(
          "h-10 w-10 rounded-full flex items-center justify-center cursor-pointer",
          "text-gray-700 hover:bg-gray-50",
          "disabled:opacity-40 disabled:hover:bg-transparent"
        )}
      >
        <Image
          src={canPrev ? ICON_ACTIVE : ICON_DISABLED}
          alt=""
          width={40}
          height={40}
          className={canPrev ? "rotate-180" : ""}
        />
      </button>

      {/* Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const active = p === page;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "min-w-[28px] w-10 h-10 p-2",
                "inline-flex items-center justify-center",
                "text-14-b cursor-pointer",
                "border-b-2",
                active
                  ? "border-primary-500 text-gray-950"
                  : "border-transparent text-gray-400 hover:text-gray-700",
                "transition-colors"
              )}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => canNext && onChange(page + 1)}
        disabled={!canNext}
        aria-label="다음 페이지"
        className={clsx(
          "h-10 w-10 rounded-full flex items-center justify-center cursor-pointer",
          "text-gray-700 hover:bg-gray-50",
          "disabled:opacity-40 disabled:hover:bg-transparent"
        )}
      >
        <Image
          src={canNext ? ICON_ACTIVE : ICON_DISABLED}
          alt=""
          width={40}
          height={40}
          className={canNext ? "" : "rotate-180"}
        />
      </button>
    </nav>
  );
}
