import { ReactNode } from "react";
import { Input } from "./Input";
import clsx from "clsx";

interface InputFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  inputProps?: React.ComponentProps<typeof Input>;
  children?: ReactNode;
  className?: string;
}

export function InputField({
  label,
  error,
  helperText,
  inputProps,
  children,
  className,
}: InputFieldProps) {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}

      {children ?? <Input {...inputProps} />}

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        helperText && <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
