import { Input } from "./Input";
import clsx from "clsx";

interface InputFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  inputProps?: React.ComponentProps<typeof Input>;
  children?: React.ReactNode;
}

export function InputField({
  label,
  error,
  helperText,
  inputProps,
  children,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {label && (
        <label className="text-[16px] font-medium text-gray-900">{label}</label>
      )}

      {children ?? (
        <Input
          {...inputProps}
          className={clsx(
            "h-[54px] w-full rounded-[16px] border border-gray-200 px-[20px] focus:ring-1 focus:ring-primary-500",
            inputProps?.className
          )}
        />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
