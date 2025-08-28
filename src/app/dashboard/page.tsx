"use client";
import DashboardMain from "@/components/dashboard/DashboardMain";
import Greeting from "@/components/dashboard/Greeting";

import { useRepaymentSchedule } from "@/contexts/RepaymentContext";

export default function DashboardPage() {
  const { schedules, isLoading, error, totalCreditAmount } =
    useRepaymentSchedule();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <Greeting />
      <DashboardMain />
    </div>
  );
}
