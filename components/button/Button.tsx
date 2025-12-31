"use client";

import { ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/utils/twmerge";
import {
  ButtonVariants,
  buttonIconVariants,
  buttonLabelVariants,
} from "./ButtonVariants";

type BaseButtonProps = {
  variant?: "primary" | "secondary" | "text" | "ghost";
  size?: "lg" | "md" | "sm";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type ButtonProps = ComponentProps<"button"> & BaseButtonProps;

type ButtonLabelProps = {
  label: string;
  variant?: "primary" | "secondary" | "text" | "ghost";
  size?: "lg" | "md" | "sm";
  className?: string;
};

export const ButtonLabel = ({
  label,
  variant = "primary",
  size = "md",
  className,
}: ButtonLabelProps) => {
  return (
    <span className={cn(buttonLabelVariants({ variant, size }), className)}>
      {label}
    </span>
  );
};

export const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  children,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(ButtonVariants({ variant, size }), className)}
      {...props}
    >
      {leftIcon && (
        <span className={cn(buttonIconVariants({ variant }))}>{leftIcon}</span>
      )}

      {children}

      {rightIcon && (
        <span className={cn(buttonIconVariants({ variant }))}>{rightIcon}</span>
      )}
    </button>
  );
};
