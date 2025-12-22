
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Nomad',
  description: 'Global Nomad - 체험 예약 플랫폼',
};

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard antialiased">
        {children}
      </body>
    </html>
  );

}
