import { ComponentProps } from "react";
import clsx from "clsx";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={clsx(
        "h-[54px] w-full rounded-[16px] border border-gray-200 px-[20px] text-sm outline-none",
        "focus:ring-1 focus:ring-primary-500",
        className
      )}
    />
  );
}
