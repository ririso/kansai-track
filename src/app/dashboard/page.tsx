"use client";
import { BaseModal } from "@/components/base-modal";
import { PaymentForm } from "@/components/payment-content";
import { RecentActivity } from "@/components/recent-activity";
import RepaymentProgress from "@/components/RepaymentProgress";
import { RepaymentSchedule } from "@/components/RepaymentSchedule";
import RepaymentSummary from "@/components/RepaymentSummary";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { getRepaymentsRecords } from "@/lib/api/getRepayments";
import { getRepaymentSchedule } from "@/lib/api/getRepaymentSchedule";
import { RepaymentInfo } from "@/types/repaymentInfo";
import { RepaymentScheduleProps } from "@/types/repaymentScheduleProps";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [records, setRecords] = useState<RepaymentInfo[]>([]);
  const [repaymentSchedule, setRepaymentSchedule] = useState<
    RepaymentScheduleProps[]
  >([]);

  // TODO ここでレコードをセットした後に関数を呼び出す。
  // 出金金額と入金金額の合計を別コンポーネントに渡すと良さそう
  // creditの合計値を保持するstate
  const [totalCreditAmount, setTotalCreditAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getRepaymentSchedule()
      .then((repaymentSchedule) => {
        setRepaymentSchedule(repaymentSchedule);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    getRepaymentsRecords()
      .then((records) => {
        setRecords(records);

        // ここでcreditの合計を算出
        const totalCreditAmount: number = records.reduce(
          (sum: number, records: RepaymentInfo) => sum + (records.credit || 0),
          0
        );
        setTotalCreditAmount(totalCreditAmount);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      {/* TODO:ユーザーor残金でメッセージを動的にしたら楽しそう */}
      <div className="mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          おかえりなさい！
        </h2>
        <p className="text-gray-600">
          返済状況を確認して、計画的に返済を進めましょう。
        </p>
      </div>

      <div className="grid gap-6">
        <RepaymentSummary totalCreditAmount={totalCreditAmount} />

        {/* <PaymentsPage repayments={records} /> */}
        {/* <CSVUploader /> */}

        <RepaymentProgress totalCreditAmount={totalCreditAmount} />

        {/* メインコンテンツエリア */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* 返済スケジュール */}
          <Card className="lg:col-span-2 border-0 shadow-custom animate-fade-in bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-gray-800">
                  返済スケジュール
                </CardTitle>
                <CardDescription className="text-gray-600">
                  今後の返済予定
                </CardDescription>
              </div>
              <Link href="/schedule">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  すべて表示
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <RepaymentSchedule repaymentSchedule={repaymentSchedule} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-1">
              <CardTitle>最近のアクティビティ</CardTitle>
              <CardDescription>アカウントの最近の活動</CardDescription>
            </div>
            <div className="ml-auto">
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">すべて</TabsTrigger>
                  <TabsTrigger value="payments">支払い</TabsTrigger>
                  <TabsTrigger value="updates">更新</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>

        {/* <div>
            <TotalRepayment />
          </div> */}

        {/* <div>
            <RepaymentsInfo />
          </div> */}

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
