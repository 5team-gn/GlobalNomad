"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  ButtonVariants,
  buttonIconVariants,
  buttonLabelVariants,
} from "./ButtonVariants";
import { cn } from "@/lib/utils/twmerge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "ghost";
  size?: "lg" | "md" | "sm";
}

interface ButtonSubProps {
  variant?: "primary" | "secondary" | "text" | "ghost";
  size?: "lg" | "md" | "sm";
  className?: string;
  children: ReactNode;
}

export const ButtonIcon = ({
  variant = "primary",
  className,
  children,
}: ButtonSubProps) => (
  <span className={cn(buttonIconVariants({ variant }), className)}>
    {children}
  </span>
);

export const ButtonLabel = ({
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonSubProps) => (
  <span className={cn(buttonLabelVariants({ variant, size }), className)}>
    {children}
  </span>
);

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(ButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
