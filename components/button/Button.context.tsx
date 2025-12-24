import { createContext, useContext } from "react";

export type ButtonVariant = "primary" | "secondary" | "text" | "ghost";
export type ButtonSize = "lg" | "md" | "sm";

interface ButtonContextValue {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
}

const ButtonContext = createContext<ButtonContextValue | null>(null);

export const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("Button subcomponents must be used within <Button />");
  }
  return context;
};

export default ButtonContext;
