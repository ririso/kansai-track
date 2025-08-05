"use client";

import { RepaymentProvider } from "@/contexts/RepaymentContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RepaymentProvider>{children}</RepaymentProvider>
    </SessionProvider>
  );
}
