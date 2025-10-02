"use client";

import { RepaymentProvider } from "@/contexts/RepaymentContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RepaymentProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </RepaymentProvider>
    </SessionProvider>
  );
}
