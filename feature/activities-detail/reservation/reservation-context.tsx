"use client";

import React, { createContext, useContext } from "react";
import type { ReservationUIProps } from "@/types/reservation/ui";

const ReservationContext = createContext<ReservationUIProps | null>(null);

export function ReservationProvider({
  value,
  children,
}: {
  value: ReservationUIProps;
  children: React.ReactNode;
}) {
  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation(): ReservationUIProps {
  const ctx = useContext(ReservationContext);
  if (!ctx)
    throw new Error("useReservation must be used within ReservationProvider");
  return ctx;
}
