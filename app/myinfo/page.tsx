import { Suspense } from "react";
import MyInfoClient from "@/feature/MyInfo/MyInfoClient";

export default function MyInfoPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <MyInfoClient />
    </Suspense>
  );
}
