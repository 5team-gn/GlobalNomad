import { useId, ReactNode } from "react";
import { Input } from "./Input";
import clsx from "clsx";

interface InputFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  children?: ReactNode;
  inputProps?: React.ComponentProps<typeof Input>;
}

export function InputField({
  label,
  error,
  helperText,
  children,
  inputProps,
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
          {...inputProps}
          className={clsx(
            "h-[54px] w-full rounded-[16px] border px-[20px]",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:ring-primary-500",
            inputProps?.className
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
