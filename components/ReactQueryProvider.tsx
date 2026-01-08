/**
 *
 * @description React Query Provider 공용 컴포넌트
 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 캐시 신선도관련하여
            staleTime: 30000,
            // 네트워크 일시 오류  1번 재시도
            retry: 1,
            // 탭/창 포커스 복귀 시 자동 refetch 방지
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      {children}

      {/* 개발 환경에서만 Devtools */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
