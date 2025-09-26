"use client";

import Pagination from "@/components/common/Pagination";
import { RepaymentScheduleDetail } from "@/components/repayment/RepaymentScheduleDetailTable";
import { Card } from "@/components/ui/shadcn/card";
import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { useScheduleFilters } from "@/hooks/useScheduleFilters";
import { RepaymentHistoryHeader } from "./RepaymentHistoryHeader";

export default function ScheduleMain() {
  const { schedules = [], totalCreditAmount } = useRepaymentSchedule();

  const {
    // 状態
    currentPage,
    searchTerm,
    statusFilter,
    periodFilter,
    sortDirection,
    // 状態更新関数
    setCurrentPage,
    setSearchTerm,
    setStatusFilter,
    setPeriodFilter,
    setSortDirection,
    // 計算済みデータ
    paginatedSchedules,
    totalScheduleCount,
    totalPages,
    itemsPerPage,
  } = useScheduleFilters({ schedules });

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
