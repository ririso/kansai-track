import { RepaymentStatusFilter } from "@/types/enums/repaymentStatusFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/shadcn/select";

type StatusFilterProps = {
  value: RepaymentStatusFilter;
  onChangeValue: (next: RepaymentStatusFilter) => void; // 名前を統一
};

const statusLabels: Record<RepaymentStatusFilter, string> = {
  [RepaymentStatusFilter.ALL]: "全て",
  [RepaymentStatusFilter.COMPLETED]: "完了",
  [RepaymentStatusFilter.SCHEDULED]: "予定",
  [RepaymentStatusFilter.DELAYED]: "遅延",
};

export function StatusFilter({ value, onChangeValue }: StatusFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(val: RepaymentStatusFilter) => onChangeValue(val)}
    >
      <SelectTrigger className="w-full sm:w-[140px] border-gray-300">
        <SelectValue placeholder="ステータス">
          {statusLabels[value]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        {Object.values(RepaymentStatusFilter).map((statusFilter) => (
          <SelectItem key={statusFilter} value={statusFilter}>
            {statusLabels[statusFilter]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
