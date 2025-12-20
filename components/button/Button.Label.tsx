import { ReactNode } from "react";
import { buttonLabelVariants } from "./ButtonVariants";
import { cn } from "@/lib/utils/twmerge";
import { useButtonContext } from "./Button.context";

interface ButtonLabelProps {
  children: ReactNode;
  className?: string;
}

const ButtonLabel = ({ children, className }: ButtonLabelProps) => {
  const { variant, size } = useButtonContext();

  return (
    <span
      className={cn(
        buttonLabelVariants({ variant, size }),
        className,
      )}
    >
      {children}
    </span>
  );
};

export default ButtonLabel;
