"use client";

import { forwardRef } from "react";
import type { InputProps } from "./Input.types";

const sizeClassMap = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
} as const;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      inputSize = "md",
      className,
      inputClassName = "",
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1 ${className ?? "w-full"}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        <input
          ref={ref}
          className={`
            block w-full box-border
            border outline-none transition
            focus:ring-2 focus:ring-blue-500
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
            ${sizeClassMap[inputSize]}
            ${inputClassName}
          `}
          {...rest}
        />

        {error && <span className="text-xs text-red-500">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-gray-500">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
