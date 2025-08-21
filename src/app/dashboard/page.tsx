"use client";
import { BaseModal } from "@/components/bak/base-modal";
import { PaymentForm } from "@/components/bak/payment-content";
import ActivityCard from "@/components/repayment/ActivityCard";
import DashboardCard from "@/components/repayment/DashboardCard";
import Greeting from "@/components/repayment/Greeting";
import RepaymentProgress from "@/components/repayment/RepaymentProgress";

import RepaymentSummary from "@/components/repayment/RepaymentSummary";
import { Button } from "@/components/ui/shadcn/button";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { CreditCard } from "lucide-react";

export default function DashboardPage() {
  const { schedules, isLoading, error, totalCreditAmount } =
    useRepaymentSchedule();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <Greeting />
      <div className="grid gap-6">
        <RepaymentSummary totalCreditAmount={totalCreditAmount} />
        <RepaymentProgress totalCreditAmount={totalCreditAmount} />
        <DashboardCard />
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
    </div>
  );
}
