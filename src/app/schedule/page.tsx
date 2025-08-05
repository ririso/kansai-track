"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import {
  ArrowLeft,
  Badge,
  CalendarIcon,
  Download,
  Filter,
  Table,
} from "lucide-react";
import Link from "next/link";

export default function SchedulePage() {
  const { schedules, isLoading, error, totalCreditAmount } =
    useRepaymentSchedule();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ダッシュボードに戻る</span>
        </Link>
        <h1 className="text-xl font-semibold ml-4 text-blue-800">
          返済スケジュール
        </h1>
      </header>
      <main className="flex-1 p-6">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Card className="w-full md:w-auto border-blue-100 shadow-custom">
              <CardContent className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                <div>
                  <p className="text-sm font-medium text-blue-700">総支払額</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {/* {formatCurrency(totalAmount)} */}¥
                    {totalCreditAmount.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Filter className="h-4 w-4" />
                フィルター
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Download className="h-4 w-4" />
                CSVダウンロード
              </Button>
            </div>
          </div>

          <Card className="border-blue-100 shadow-custom">
            <CardHeader className="bg-blue-50 rounded-t-lg">
              <CardTitle className="text-blue-800">
                返済スケジュール一覧
              </CardTitle>
              <CardDescription className="text-blue-600">
                今後の返済予定と過去の返済履歴
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  {/* <Input
                    placeholder="検索..."
                    className="w-full border-blue-200 focus:border-blue-400"
                  /> */}
                </div>
                <div className="w-full sm:w-[180px]">
                  <Select defaultValue="all">
                    <SelectTrigger className="border-blue-200">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="scheduled">予定</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                      <SelectItem value="overdue">遅延</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border border-blue-200">
                <Table>
                  <TableHeader className="bg-blue-50">
                    <TableRow>
                      <TableHead className="text-blue-700">支払い日</TableHead>
                      <TableHead className="text-blue-700">金額</TableHead>
                      <TableHead className="text-blue-700">
                        ステータス
                      </TableHead>
                      <TableHead className="text-blue-700">
                        支払い方法
                      </TableHead>
                      <TableHead className="text-right text-blue-700">
                        残額
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule: any) => (
                      <TableRow key={schedule.id} className="hover:bg-blue-50">
                        <TableCell className="flex items-center gap-2 text-blue-800">
                          <CalendarIcon className="h-4 w-4 text-blue-500" />
                          {/* {formatDate(schedule.date)} */}
                        </TableCell>
                        <TableCell className="text-blue-900 font-medium">
                          {/* {formatCurrency(schedule.amount)} */}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              schedule.status === "完了"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : schedule.status === "遅延"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-orange-50 text-orange-700 border-orange-200"
                            }
                          >
                            {schedule.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-blue-800">
                          {schedule.method || "-"}
                        </TableCell>
                        <TableCell className="text-right text-blue-900 font-medium">
                          {/* {formatCurrency(schedule.remaining)} */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="border-blue-200 text-blue-700"
                >
                  前へ
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  次へ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
