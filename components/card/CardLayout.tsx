import type { HTMLAttributes, PropsWithChildren } from "react";

type Variant = "grid" | "list"; //그리드 타입 | 1열 리스트 타입

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
