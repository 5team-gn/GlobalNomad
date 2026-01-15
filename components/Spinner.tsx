"use client";

type SpinnerProps = {
  size?: number;
  className?: string;
  label?: string;
};

export default function Spinner({
  size = 24,
  className = "text-green-500",
  label = "로딩 중",
}: SpinnerProps) {
  return (
    <div role="status" aria-label={label} className="inline-flex items-center">
      <svg
        className={`animate-spin ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          opacity="0.25"
        />
        <path
          d="M22 12a10 10 0 0 1-10 10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      <span className="sr-only">{label}</span>
    </div>
  );
}
