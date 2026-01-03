"use client";

import { ReactNode, ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils/twmerge";
import {
  ButtonVariants,
  buttonIconVariants,
  buttonLabelVariants,
} from "./ButtonVariants";

const DEFAULT_BUTTON_PROPS = {
  variant: "primary",
  size: "md",
} as const;

type BaseButtonProps = {
  variant?: "primary" | "secondary" | "text" | "ghost";
  size?: "lg" | "md" | "sm";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type ButtonProps = ComponentPropsWithRef<"button"> & BaseButtonProps;

export type ButtonLabelProps = ButtonProps & {
  label?: string;
};

export const Button = ({
  variant = DEFAULT_BUTTON_PROPS.variant, 
  size = DEFAULT_BUTTON_PROPS.size,       
  disabled = false,
  className,
  children,
  leftIcon,
  rightIcon,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(ButtonVariants({ variant, size }), className)}
      ref={ref}
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

export const ButtonLabel = ({
  label,
  children,
  variant = DEFAULT_BUTTON_PROPS.variant, 
  size = DEFAULT_BUTTON_PROPS.size,       
  ref,
  ...buttonProps
}: ButtonLabelProps) => {
  return (
    <Button variant={variant} size={size} ref={ref} {...buttonProps}>
      {label && (
        <span className={cn(buttonLabelVariants({ variant, size }))}>
          {label}
        </span>
      )}
      {children}
    </Button>
  );
};
