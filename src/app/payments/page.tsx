import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";

import { RepaymentInfo } from "@/types/repaymentInfo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import {
  ArrowLeft,
  CalendarIcon,
  Download,
  Filter,
  Search,
  Table,
} from "lucide-react";
import Link from "next/link";

type Props = {
  repayments: RepaymentInfo[];
};

export default function PaymentsPage() {
  // APIからデータを取得
  const { schedules, isLoading, error, totalCreditAmount } =
    useRepaymentSchedule();

  // // 統計情報を計算
  // const totalPaid = parsedPayments.reduce(
  //   (sum: number, payment: any) => sum + payment.amount,
  //   0
  // );
  // const completedPayments = parsedPayments.filter(
  //   (p: any) => p.status === "完了"
  // ).length;
  // const averageAmount = totalPaid / completedPayments || 0;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6 shadow-custom">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">ダッシュボードに戻る</span>
        </Link>
        <div className="h-6 w-px bg-gray-300 mx-2" />
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <CalendarIcon className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">返済スケジュール</h1>
        </div>
      </header>

      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* ページタイトル */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              作成中返済スケジュール管理
            </h2>
            <p className="text-gray-600">
              スケジュール管理。今後の返済予定と過去の支払い履歴を確認できます。
            </p>
          </div>

          {/* 統計カード */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="border-0 shadow-custom hover:shadow-lg transition-all duration-200 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      総スケジュール数
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {/* {totalScheduled}件 */}
                      1件
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-custom hover:shadow-lg transition-all duration-200 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      完了済み
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {/* {completedPayments}件 */}
                      1件
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-custom hover:shadow-lg transition-all duration-200 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      予定
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {/* {upcomingPayments}件 */}
                      1件
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-lg">
                      ⏳
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-custom hover:shadow-lg transition-all duration-200 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      遅延
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {/* {overduePayments}件 */}
                      1件
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-lg">!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* メインコンテンツ */}
          <Card className="border-0 shadow-custom animate-fade-in">
            <CardHeader className="bg-white border-b border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <CardTitle className="text-gray-800 text-xl">
                    返済スケジュール一覧
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {/* 全{totalScheduled}件のスケジュール（総額:{" "}
                    {formatCurrency(totalAmount)}） */}
                    1件
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    フィルター
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    CSVダウンロード
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* 検索・フィルター */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {/* <Input
                    placeholder="日付や金額で検索..."
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  /> */}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[140px] border-gray-300">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                      <SelectItem value="scheduled">予定</SelectItem>
                      <SelectItem value="overdue">遅延</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[140px] border-gray-300">
                      <SelectValue placeholder="期間" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="this-month">今月</SelectItem>
                      <SelectItem value="next-month">来月</SelectItem>
                      <SelectItem value="this-year">今年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* スケジュールテーブル */}
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-gray-700 font-semibold">
                        支払い日
                      </TableHead>
                      <TableHead className="text-gray-700 font-semibold">
                        金額
                      </TableHead>
                      <TableHead className="text-gray-700 font-semibold">
                        ステータス
                      </TableHead>
                      <TableHead className="text-gray-700 font-semibold">
                        支払い方法
                      </TableHead>
                      <TableHead className="text-right text-gray-700 font-semibold">
                        残額
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule: any) => (
                      <TableRow
                        key={schedule.id}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-800">
                              {/* {formatDate(schedule.date)} */}1
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-900 font-bold">
                            {/* {formatCurrency(schedule.amount)} */}1
                          </span>
                        </TableCell>
                        <TableCell>
                          {/* <Badge
                            variant="outline"
                            className={
                              schedule.status === "完了"
                                ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                                : schedule.status === "遅延"
                                  ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
                                  : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50"
                            }
                          > */}
                          {/* {schedule.status} */}
                          {/* </Badge> */}1
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-700">
                            {schedule.method || "未設定"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-gray-900 font-semibold">
                            {/* {formatCurrency(schedule.remaining)} */}1
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* ページネーション */}
              {/* <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                <p className="text-sm text-gray-600">
                  {parsedSchedules.length}件中 1-
                  {Math.min(20, parsedSchedules.length)}件を表示
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="border-gray-300 text-gray-400 bg-transparent"
                  >
                    前へ
                  </Button>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-blue-600 text-white border-blue-600"
                    >
                      1
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      2
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      3
                    </Button>
                    <span className="text-gray-500 px-2">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      10
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    次へ
                  </Button>
                </div>
              </div> */}
            </CardContent>
          </Card>

          {/* 注意事項 */}
          <Card className="border-0 shadow-custom mt-6 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">i</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">ご注意</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 支払い期限の7日前にメール通知をお送りします</li>
                    <li>
                      • 支払い方法の変更は各支払い予定日の10日前まで可能です
                    </li>
                    <li>• 遅延がある場合は、お早めにお支払いください</li>
                    <li>
                      •
                      ご不明な点がございましたら、サポートまでお問い合わせください
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
