"use client";
import RepaymentCount from "@/components/RepaymentCount";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SchedulePage() {
  const { schedules, isLoading, error, totalCreditAmount } =
    useRepaymentSchedule();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">ダッシュボードに戻る</span>
        </Link>
        <RepaymentCount />
      </>
    </div>
  );
}
