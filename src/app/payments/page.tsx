"use client";

import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import Pagination from "@/components/common/Pagination";
import { RepaymentScheduleDetail } from "@/components/repayment/RepaymentScheduleDetailTable";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { useScheduleFilters } from "@/hooks/useScheduleFilters";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { RepaymentStatusFilter } from "@/types/enums/repaymentStatusFilter";
import { RepaymentPeriodFilter } from "@/types/enums/repaymentPeriodFilter";
import {
  ArrowLeft,
  CalendarIcon,
  Download,
  Filter,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function PaymentsPage() {
  const { schedules, totalCreditAmount } = useRepaymentSchedule();

  const {
    currentPage,
    searchTerm,
    statusFilter,
    periodFilter,
    setCurrentPage,
    setSearchTerm,
    setStatusFilter,
    setPeriodFilter,
    paginatedSchedules,
    totalScheduleCount,
    totalPages,
    itemsPerPage,
  } = useScheduleFilters({ schedules });

  const statistics = useMemo(() => {
    const completedCount = schedules.filter(
      (s) => s.status === RepaymentStatus.Completed
    ).length;
    const scheduledCount = schedules.filter(
      (s) => s.status === RepaymentStatus.Scheduled
    ).length;
    const delayedCount = schedules.filter(
      (s) => s.status === RepaymentStatus.Delayed
    ).length;

    return {
      total: schedules.length,
      completed: completedCount,
      scheduled: scheduledCount,
      delayed: delayedCount,
    };
  }, [schedules]);

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
                      {statistics.total}件
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
                      {statistics.completed}件
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
                      {statistics.scheduled}件
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
                      {statistics.delayed}件
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
                    全{totalScheduleCount}件のスケジュール（総額: ¥{totalCreditAmount.toLocaleString()}）
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
                  <Input
                    placeholder="日付や金額で検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value as RepaymentStatusFilter)}
                  >
                    <SelectTrigger className="w-full sm:w-[140px] border-gray-300">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={RepaymentStatusFilter.ALL}>すべて</SelectItem>
                      <SelectItem value={RepaymentStatusFilter.COMPLETED}>完了</SelectItem>
                      <SelectItem value={RepaymentStatusFilter.SCHEDULED}>予定</SelectItem>
                      <SelectItem value={RepaymentStatusFilter.DELAYED}>遅延</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={periodFilter}
                    onValueChange={(value) => setPeriodFilter(value as RepaymentPeriodFilter)}
                  >
                    <SelectTrigger className="w-full sm:w-[140px] border-gray-300">
                      <SelectValue placeholder="期間" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={RepaymentPeriodFilter.ALL}>すべて</SelectItem>
                      <SelectItem value={RepaymentPeriodFilter.THIS_MONTH}>今月</SelectItem>
                      <SelectItem value={RepaymentPeriodFilter.NEXT_MONTH}>来月</SelectItem>
                      <SelectItem value={RepaymentPeriodFilter.THIS_YEAR}>今年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* スケジュールテーブル */}
              <RepaymentScheduleDetail
                paginatedSchedules={paginatedSchedules}
                itemsPerPage={itemsPerPage}
              />

              {/* ページネーション */}
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalScheduleCount}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
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
