// app/activities/[id]/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-[1200px] mx-auto px-6 mt-[34px] mb-45">
      <p className="text-18-b text-gray-950">문제가 발생했습니다.</p>
      <p className="text-14-body-m text-gray-600 mt-2">{error.message}</p>

      <button
        type="button"
        className="mt-6 px-4 py-2 rounded-xl bg-gray-900 text-white"
        onClick={() => reset()}
      >
        다시 시도
      </button>
    </main>
  );
}
