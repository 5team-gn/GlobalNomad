import { ReactNode } from "react";
import { buttonIconVariants } from "./ButtonVariants";
import { cn } from "@/lib/utils/twmerge";
import { useButtonContext } from "./Button.context";

interface ButtonIconProps {
  children: ReactNode;
  className?: string;
}

const ButtonIcon = ({ children, className }: ButtonIconProps) => {
  const { variant, disabled } = useButtonContext();

  return (
    <span
      className={cn(
        buttonIconVariants({ variant }),
        disabled && "pointer-events-none",
        className,
      )}
    >
      {children}
    </span>
  );
};

export default ButtonIcon;
