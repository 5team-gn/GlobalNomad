import { ComponentProps } from "react";
import clsx from "clsx";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input {...props} className={clsx("border rounded px-3 py-2", className)} />
  );
}
