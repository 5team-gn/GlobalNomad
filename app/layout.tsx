import type { Metadata } from "next";
import Script from "next/script";
import "../style/global.css";
import Providers from "./providers";
import ToastProvider from "./ToastProvider";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

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
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;

  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ToastProvider />
        </Providers>

        {/* 카카오맵 SDK */}
        {kakaoKey && (
          <Script
            strategy="afterInteractive"
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`}
          />
        )}
      </body>
    </html>
  );
}
