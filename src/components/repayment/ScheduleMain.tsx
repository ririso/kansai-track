// Main.tsx
"use client";

import Pagination from "@/components/layout/Pagination";
import { RepaymentScheduleDetail } from "@/components/repayment/RepaymentScheduleDetail";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { useMemo, useState } from "react";

export default function ScheduleMain() {
  const { schedules = [], totalCreditAmount } = useRepaymentSchedule();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const itemsPerPage = 5;

  // フィルター + 検索適用
  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => {
      // ステータスフィルター
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "completed" && s.status === "完了") ||
        (statusFilter === "scheduled" && s.status === "予定") ||
        (statusFilter === "overdue" && s.status === "遅延");

      // 期間フィルター
      const today = new Date();
      const scheduledDate = new Date(s.scheduledDate);
      let periodMatch = true;
      if (periodFilter === "this-month") {
        periodMatch =
          scheduledDate.getMonth() === today.getMonth() &&
          scheduledDate.getFullYear() === today.getFullYear();
      } else if (periodFilter === "next-month") {
        const nextMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          1
        );
        periodMatch =
          scheduledDate.getMonth() === nextMonth.getMonth() &&
          scheduledDate.getFullYear() === nextMonth.getFullYear();
      } else if (periodFilter === "this-year") {
        periodMatch = scheduledDate.getFullYear() === today.getFullYear();
      }

      // 検索フィルター（日付・金額文字列）
      const searchMatch =
        s.scheduledDate.includes(searchTerm) ||
        s.amount.toString().includes(searchTerm);

      return statusMatch && periodMatch && searchMatch;
    });
  }, [schedules, searchTerm, statusFilter, periodFilter]);

  // 支払い予定日でソート
  const sortedSchedules = useMemo(() => {
    return [...filteredSchedules].sort((a, b) => {
      const aTime = new Date(a.scheduledDate || 0).getTime();
      const bTime = new Date(b.scheduledDate || 0).getTime();
      return sortDirection === "asc" ? aTime - bTime : bTime - aTime;
    });
  }, [filteredSchedules, sortDirection]);

  const totalScheduleCount = filteredSchedules.length;
  const totalPages = Math.ceil(totalScheduleCount / itemsPerPage);

  const paginatedSchedules = sortedSchedules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="border-0 shadow-custom animate-fade-in">
      <CardHeader className="bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>返済履歴一覧</CardTitle>
          <CardDescription>
            全{totalScheduleCount}件のスケジュール（総額: ¥
            {totalCreditAmount.toLocaleString()}）
          </CardDescription>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto relative">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="日付や金額で検索..."
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
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

          <Select value={periodFilter} onValueChange={setPeriodFilter}>
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

          {/* ソートボタン */}
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100 transition"
            onClick={() => {
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
              setCurrentPage(1); // ページをリセット
            }}
          >
            {sortDirection === "asc" ? (
              <>
                <SortAsc className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-blue-600">昇順</span>
              </>
            ) : (
              <>
                <SortDesc className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">降順</span>
              </>
            )}
          </button>
        </div>
      </CardHeader>

      <RepaymentScheduleDetail
        paginatedSchedules={paginatedSchedules}
        itemsPerPage={itemsPerPage}
      />
      <div className="p-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalScheduleCount}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </Card>
  );
}
