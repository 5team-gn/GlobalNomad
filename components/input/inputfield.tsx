import { useId, ReactNode } from "react";
import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import { Input } from "./Input";

interface InputFieldProps extends ComponentPropsWithRef<typeof Input> {
  label?: string;
  error?: string;
  helperText?: string;
  children?: ReactNode;
}

export function InputField({
  label,
  error,
  helperText,
  children,
  className,
  ...props
}: InputFieldProps) {
  const id = useId();

  return (
    <div className="flex w-full flex-col gap-[10px]">
      {label && (
        <label htmlFor={id} className="text-[16px] font-medium text-gray-900">
          {label}
        </label>
      )}

      {children ?? (
        <Input
          id={id}
          {...props}
          className={clsx(
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:ring-primary-500",
            className
          )}
        />
      )}

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        helperText && <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
