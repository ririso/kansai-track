"use client";
import { BaseModal } from "@/components/bak/base-modal";
import { PaymentForm } from "@/components/bak/payment-content";
import ActivityCard from "@/components/dashboard/ActivityCard";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RepaymentProgress from "@/components/dashboard/RepaymentProgress";

import RepaymentSummary from "@/components/dashboard/RepaymentSummary";
import { Button } from "@/components/ui/shadcn/button";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { CreditCard } from "lucide-react";
import RepaymentHistoryArea from "./RepaymentHistoryArea";

export default function DashboardPage() {
  const { isLoading, error, totalCreditAmount } = useRepaymentSchedule();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <>
      <div className="grid gap-6">
        <RepaymentSummary totalCreditAmount={totalCreditAmount} />
        <RepaymentProgress totalCreditAmount={totalCreditAmount} />

        <div className="grid gap-6 lg:grid-cols-3">
          <DashboardCard />
          <RepaymentHistoryArea />
        </div>
        <ActivityCard />

        <div className="flex justify-center">
          <BaseModal
            title="支払い確認"
            trigger={
              <Button className="w-full max-w-xs">
                <CreditCard className="mr-2 h-4 w-4" />
                今月の支払いを行う
              </Button>
            }
          >
            <PaymentForm />
          </BaseModal>
        </div>
      </div>
    </>
  );
}
