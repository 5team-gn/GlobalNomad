import { ComponentProps } from "react";
import clsx from "clsx";

type InputProps = ComponentProps<"input"> & {
  inputRef?: React.Ref<HTMLInputElement>;
};

export function Input({ className, inputRef, ...props }: InputProps) {
  return (
    <input
      ref={inputRef}
      {...props}
      className={clsx(
        "h-[54px] w-full rounded-[16px] border px-[20px] text-sm outline-none",
        className
      )}
    />
  );
}
