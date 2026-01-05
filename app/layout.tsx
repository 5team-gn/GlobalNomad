import type { Metadata } from "next";
import "../style/global.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GlobalNomad",
  description:
    "캘린더와 지도 SDK를 활용해 체험 상품을 예약할 수 있는 글로벌 체험 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
