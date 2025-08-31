import { RepaymentPeriodFilter } from "@/types/enums/repaymentPeriodFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/shadcn/select";

type PeriodFilterProps = {
  value: RepaymentPeriodFilter;
  onValueChange: (value: RepaymentPeriodFilter) => void;
};

const periodLabels: Record<RepaymentPeriodFilter, string> = {
  [RepaymentPeriodFilter.ALL]: "全期間",
  [RepaymentPeriodFilter.THIS_MONTH]: "今月",
  [RepaymentPeriodFilter.NEXT_MONTH]: "来月",
  [RepaymentPeriodFilter.THIS_YEAR]: "今年",
};

export function PeriodFilter({ value, onValueChange }: PeriodFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(val: RepaymentPeriodFilter) => onValueChange(val)}
    >
      <SelectTrigger className="w-full sm:w-[140px] border-gray-300">
        <SelectValue placeholder="期間">{periodLabels[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        {Object.values(RepaymentPeriodFilter).map((periodFilter) => (
          <SelectItem key={periodFilter} value={periodFilter}>
            {periodLabels[periodFilter]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
