"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-20 text-center">
      <h2 className="text-xl font-bold text-red-500">문제가 발생했습니다!</h2>
      <p className="mb-4 text-gray-600">{error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-black text-white rounded-md">
        다시 시도하기
      </button>
    </div>
  );
}