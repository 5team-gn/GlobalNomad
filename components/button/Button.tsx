"use client";

import { ReactNode } from "react";
import ButtonContext from "./Button.context";
import { ButtonVariants } from "./ButtonVariants";
import { cn } from "@/lib/utils/twmerge";

interface ButtonProps {
  variant?: "primary" | "secondary" | "text" | "ghost";
  size?: "lg" | "md" | "sm";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <ButtonContext.Provider value={{ variant, size, disabled }}>
      <button
        type="button"
        disabled={disabled}
        className={cn(
          ButtonVariants({ variant, size }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    </ButtonContext.Provider>
  );
}
