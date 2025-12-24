import { forwardRef } from "react";
import ButtonContext from "./Button.context";
import { ButtonVariants } from "./ButtonVariants";
import { cn } from "@/lib/utils/twmerge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "ghost";
  size?: "lg" | "md" | "sm";
  full?: boolean;
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      full = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonContext.Provider value={{ variant, size, disabled }}>
        <button
          ref={ref}
          disabled={disabled}
          className={cn(
            ButtonVariants({ variant, size, full }),
            className,
          )}
          {...props}
        >
          {children}
        </button>
      </ButtonContext.Provider>
    );
  },
);

ButtonBase.displayName = "Button";
export default ButtonBase;
