import { Suspense } from "react";
import MyInfoClient from "@/feature/MyInfo/MyInfoClient";

export default function MyInfoPage() {
  return (
    <Suspense>
      <MyInfoClient />
    </Suspense>
  );
}
