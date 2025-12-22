// src/components/common/CardLayout.tsx
import type { HTMLAttributes, PropsWithChildren } from "react";

type Variant = "grid" | "list";

type Props = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    variant?: Variant;
  }
>;

export default function CardLayout({
  variant = "grid",
  className = "",
  ...props
}: Props) {
  if (variant === "list") {
    return (
      <div className={["flex flex-col", className].join(" ")} {...props} />
    );
  }

  return <div className={["grid", className].join(" ")} {...props} />;
}
