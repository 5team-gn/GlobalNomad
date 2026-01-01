import { ComponentProps, forwardRef } from "react";
import clsx from "clsx";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(
          "h-[54px] w-full rounded-[16px] border border-gray-200 px-[20px] text-sm outline-none",
          "focus:ring-1 focus:ring-primary-500",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";
