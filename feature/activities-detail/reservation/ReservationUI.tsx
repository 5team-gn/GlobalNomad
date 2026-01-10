"use client";

import ReservationPanelDesktop from "./ReservationPanelDesktop";
import ReservationBarMobile from "./ReservationBarMobile";
import ReservationSheet from "./ReservationSheet";
import type { ReservationUIProps } from "@/types/reservation/ui";
import { ReservationProvider } from "./reservation-context";

export default function ReservationUI(props: ReservationUIProps) {
  return (
    <ReservationProvider value={props}>
      <div className="shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
        <div className="hidden lg:block">
          <ReservationPanelDesktop />
        </div>

        <div className="lg:hidden">
          <ReservationBarMobile />
          <ReservationSheet />
        </div>
      </div>
    </ReservationProvider>
  );
}
