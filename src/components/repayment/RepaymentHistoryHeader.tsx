import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { SortDirection } from "@/types/enums/sortDirection";

import { RepaymentPeriodFilter } from "@/types/enums/repaymentPeriodFilter";
import { RepaymentStatusFilter } from "@/types/enums/repaymentStatusFilter";
import { Search } from "lucide-react";
import { PeriodFilter } from "./PeriodFilter";
import SortButton from "./SortButton";
import { StatusFilter } from "./StatusFilter";

type RepaymentHistoryHeaderProps = {
  totalScheduleCount: number;
  totalCreditAmount: number;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: RepaymentStatusFilter;
  setStatusFilter: (value: RepaymentStatusFilter) => void;
  periodFilter: RepaymentPeriodFilter;
  setPeriodFilter: (value: RepaymentPeriodFilter) => void;
  sortDirection: SortDirection;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
  setCurrentPage: (page: number) => void;
};

export function RepaymentHistoryHeader({
  totalScheduleCount,
  totalCreditAmount,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  periodFilter,
  setPeriodFilter,
  sortDirection,
  setSortDirection,
  setCurrentPage,
}: RepaymentHistoryHeaderProps) {
  return (
    <CardHeader className="bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <CardTitle>返済履歴一覧</CardTitle>
        <CardDescription>
          全{totalScheduleCount}件のスケジュール（総額: ¥
          {totalCreditAmount.toLocaleString()}）
        </CardDescription>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto relative">
        {/* 検索バー */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="日付や金額で検索..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ステータスフィルタ */}
        <StatusFilter value={statusFilter} onValueChange={setStatusFilter} />
        {/* ステータスフィルタ */}
        <PeriodFilter value={periodFilter} onValueChange={setPeriodFilter} />
        {/* ソートボタン */}
        <SortButton
          sortDirection={sortDirection}
          onToggle={() => {
            setSortDirection((prev: SortDirection) =>
              prev === SortDirection.ASC
                ? SortDirection.DESC
                : SortDirection.ASC
            );
            setCurrentPage(1); // ページをリセット
          }}
        />
      </div>
    </CardHeader>
  );
}
