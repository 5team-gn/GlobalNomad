import { ComponentPropsWithRef } from "react";
import clsx from "clsx";

type InputProps = ComponentPropsWithRef<"input">;

export function Input({ className, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx(
        "h-[54px] w-full rounded-[16px] border px-[20px] text-sm outline-none",
        className
      )}
    />
  );
}
