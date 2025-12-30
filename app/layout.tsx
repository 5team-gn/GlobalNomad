import type { Metadata } from "next";
import "../style/global.css";

export const metadata: Metadata = {
  title: "Design System Docs",
  description: "Button component documentation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
