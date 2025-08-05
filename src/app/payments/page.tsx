import { PaymentTable } from "@/components/payment-table";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

import { RepaymentInfo } from "@/types/repaymentInfo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { ArrowLeft, Download, Filter, Search } from "lucide-react";
import Link from "next/link";

type Props = {
  repayments: RepaymentInfo[];
};

export default function PaymentsPage({ repayments }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-freee-gray-50">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-freee-gray-200 bg-white px-6 shadow-freee">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-freee-blue-600 hover:text-freee-blue-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ダッシュボードに戻る</span>
        </Link>
        <h1 className="text-xl font-bold ml-4 text-freee-gray-800">
          返済履歴管理
        </h1>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* 統計カード */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="border-0 shadow-freee">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    {/* <p className="text-sm font-medium text-freee-gray-600 mb-1">
                      総支払額
                    </p>
                    <p className="text-2xl font-bold text-freee-gray-900">
                      {new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                        maximumFractionDigits: 0,
                      }).format(totalPaid)} */}
                    {/* </p> */}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-freee-blue-100 flex items-center justify-center">
                    <span className="text-freee-blue-600 font-bold">¥</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-freee">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-freee-gray-600 mb-1">
                      支払い回数
                    </p>
                    {/* <p className="text-2xl font-bold text-freee-gray-900">
                      {completedPayments}回
                    </p> */}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-freee-green-100 flex items-center justify-center">
                    <span className="text-freee-green-600 font-bold">#</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-freee">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    {/* <p className="text-sm font-medium text-freee-gray-600 mb-1">
                      平均支払額
                    </p>
                    <p className="text-2xl font-bold text-freee-gray-900">
                      {new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                        maximumFractionDigits: 0,
                      }).format(averageAmount)}
                    </p> */}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-freee-orange-100 flex items-center justify-center">
                    <span className="text-freee-orange-600 font-bold">Ø</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* メインコンテンツ */}
          <Card className="border-0 shadow-freee">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-freee-gray-800">
                    返済履歴一覧
                  </CardTitle>
                  <CardDescription className="text-freee-gray-600">
                    支払い履歴の確認・編集・削除ができます
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* <AddPaymentModal /> */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-freee-gray-300 text-freee-gray-700 hover:bg-freee-gray-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    CSVエクスポート
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 検索・フィルター */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-freee-gray-400" />
                  {/* <Input
                    placeholder="支払い方法や金額で検索..."
                    className="pl-10 border-freee-gray-300 focus:border-freee-blue-500"
                  /> */}
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] border-freee-gray-300">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                      <SelectItem value="pending">保留</SelectItem>
                      <SelectItem value="failed">失敗</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] border-freee-gray-300">
                      <SelectValue placeholder="支払い方法" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="bank">銀行振込</SelectItem>
                      <SelectItem value="credit">クレジットカード</SelectItem>
                      <SelectItem value="convenience">
                        コンビニ支払い
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-freee-gray-300 text-freee-gray-700 hover:bg-freee-gray-50"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* 支払い履歴テーブル */}
              <PaymentTable repayments={repayments} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
