/**
 *
 * @description 공용 Provider 컴포넌트
 */

"use client";

import ReactQueryProvider from "@/components/ReactQueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
