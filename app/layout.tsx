import type { Metadata } from "next";
import Script from "next/script";
import "../style/global.css";

export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "Button component documentation",
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
        {children}

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
