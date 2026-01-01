import { ReactNode } from "react";
import { Input } from "./Input";

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
  return (
    <div className="flex w-full flex-col gap-[10px]">
      {label && (
        <label className="text-[16px] font-medium text-gray-900">{label}</label>
      )}

      {children ?? <Input {...inputProps} />}

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        helperText && <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
