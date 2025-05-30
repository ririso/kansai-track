"use client";
import { BaseModal } from "@/components/base-modal";
import CSVUploader from "@/components/CsvUploader";
import { PaymentForm } from "@/components/payment-content";
import { PaymentHistory } from "@/components/payment-history";
import { RecentActivity } from "@/components/recent-activity";
import { RepaymentSchedule } from "@/components/repayment-schedule";
import RepaymentSummary from "@/components/RepaymentSummary";
import { Progress } from "@/components/ui/shadcn//progress";
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
import { RepaymentInfo } from "@/types/repaymentInfo";
import { CalendarIcon, CreditCard, LineChart, Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import PaymentsPage from "../payments/page";

export default function DashboardPage() {
  const [records, setRecords] = useState<RepaymentInfo[]>([]);
  // TODO ここでレコードをセットした後に関数を呼び出す。
  // 出金金額と入金金額の合計を別コンポーネントに渡すと良さそう
  // creditの合計値を保持するstate
  const [totalCreditAmount, setTotalCreditAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

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
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <RepaymentSummary totalCreditAmount={totalCreditAmount} />

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  次回支払い
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥15,000</div>
                <p className="text-xs text-muted-foreground">
                  2025年6月10日まで
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">完済予定</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2032年5月</div>
                <p className="text-xs text-muted-foreground">あと7年</p>
              </CardContent>
            </Card>
          </div>

          <PaymentsPage repayments={records} />

          <CSVUploader />
          <Card>
            <CardHeader>
              <CardTitle>返済進捗状況</CardTitle>
              <CardDescription>これまでに40%返済済み</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">返済進捗</span>
                  </div>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <Progress value={40} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>¥0</span>
                  <span>¥1,400,000</span>
                  <span>¥3,500,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>返済スケジュール</CardTitle>
                <CardDescription>今後の返済予定</CardDescription>
              </CardHeader>
              <CardContent>
                <RepaymentSchedule />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>支払い履歴</CardTitle>
                <CardDescription>過去の支払い記録</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentHistory />
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
      </main>
    </div>
  );
}
