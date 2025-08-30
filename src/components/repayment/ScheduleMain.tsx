// Main.tsx
"use client";

import Pagination from "@/components/common/Pagination";
import { RepaymentScheduleDetail } from "@/components/repayment/RepaymentScheduleDetailTable";
import { Card } from "@/components/ui/shadcn/card";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { RepaymentStatusFilter } from "@/types/enums/repaymentStatusFilter";
import { SortDirection } from "@/types/enums/sortDirection";
import { useMemo, useState } from "react";
import { RepaymentHistoryHeader } from "./RepaymentHistoryHeader";

export default function ScheduleMain() {
  const { schedules = [], totalCreditAmount } = useRepaymentSchedule();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RepaymentStatusFilter>(
    RepaymentStatusFilter.ALL
  );
  const [periodFilter, setPeriodFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.DESC
  );

  const itemsPerPage = 5;

  // フィルター + 検索適用
  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => {
      // ステータスフィルター
      const statusMatch =
        statusFilter === RepaymentStatusFilter.ALL ||
        (statusFilter === RepaymentStatusFilter.COMPLETED &&
          s.status === RepaymentStatus.Completed) ||
        (statusFilter === RepaymentStatusFilter.SCHEDULED &&
          s.status === RepaymentStatus.Scheduled) ||
        (statusFilter === RepaymentStatusFilter.DELAYED &&
          s.status === RepaymentStatus.Delayed);

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
      return sortDirection === SortDirection.ASC
        ? aTime - bTime
        : bTime - aTime;
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
      <RepaymentHistoryHeader
        totalScheduleCount={totalScheduleCount}
        totalCreditAmount={totalCreditAmount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        setCurrentPage={setCurrentPage}
      />

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
