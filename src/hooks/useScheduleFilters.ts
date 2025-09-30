"use client";

import { RepaymentPeriodFilter } from "@/types/enums/repaymentPeriodFilter";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { RepaymentStatusFilter } from "@/types/enums/repaymentStatusFilter";
import { SortDirection } from "@/types/enums/sortDirection";
import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { useMemo, useState } from "react";

interface UseScheduleFiltersProps {
  schedules: RepaymentScheduleType[];
  itemsPerPage?: number;
}

export function useScheduleFilters({
  schedules = [],
  itemsPerPage = 5
}: UseScheduleFiltersProps) {
  // フィルター状態管理
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RepaymentStatusFilter>(
    RepaymentStatusFilter.ALL
  );
  const [periodFilter, setPeriodFilter] = useState<RepaymentPeriodFilter>(
    RepaymentPeriodFilter.ALL
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.DESC
  );

  // フィルタリング + 検索適用
  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      // ステータスフィルター
      const statusMatch =
        statusFilter === RepaymentStatusFilter.ALL ||
        (statusFilter === RepaymentStatusFilter.COMPLETED &&
          schedule.status === RepaymentStatus.Completed) ||
        (statusFilter === RepaymentStatusFilter.SCHEDULED &&
          schedule.status === RepaymentStatus.Scheduled) ||
        (statusFilter === RepaymentStatusFilter.DELAYED &&
          schedule.status === RepaymentStatus.Delayed);

      // 期間フィルター
      const today = new Date();
      const scheduledDate = new Date(schedule.scheduledDate);
      let periodMatch = true;
      if (periodFilter === RepaymentPeriodFilter.THIS_MONTH) {
        periodMatch =
          scheduledDate.getMonth() === today.getMonth() &&
          scheduledDate.getFullYear() === today.getFullYear();
      } else if (periodFilter === RepaymentPeriodFilter.NEXT_MONTH) {
        const nextMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          1
        );
        periodMatch =
          scheduledDate.getMonth() === nextMonth.getMonth() &&
          scheduledDate.getFullYear() === nextMonth.getFullYear();
      } else if (periodFilter === RepaymentPeriodFilter.THIS_YEAR) {
        periodMatch = scheduledDate.getFullYear() === today.getFullYear();
      }

      // 検索フィルター（日付・金額文字列）
      const searchMatch =
        schedule.scheduledDate.includes(searchTerm) ||
        schedule.amount.toString().includes(searchTerm);

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

  // ページネーション計算
  const totalScheduleCount = filteredSchedules.length;
  const totalPages = Math.ceil(totalScheduleCount / itemsPerPage);
  const paginatedSchedules = sortedSchedules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
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
    filteredSchedules,
    sortedSchedules,
    paginatedSchedules,
    totalScheduleCount,
    totalPages,
    itemsPerPage,
  };
}