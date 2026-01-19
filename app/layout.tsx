import type { Metadata } from "next";
import "../style/global.css";
<<<<<<< HEAD
import Providers from "./providers";
import ToastProvider from "./ToastProvider";

import { AuthProvider } from "./AuthProvider";
=======
>>>>>>> origin/main

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
      <body>
<<<<<<< HEAD
        <Providers>
          <AuthProvider>
            {children}
            <ToastProvider />
          </AuthProvider>
        </Providers>

        {/* 카카오맵 SDK */}
        {kakaoKey && (
          <Script
            strategy="afterInteractive"
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`}
          />
        )}
=======
        {children}
>>>>>>> origin/main
      </body>
    </html>
  );
}