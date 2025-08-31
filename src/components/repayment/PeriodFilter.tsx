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
  onChangeValue: (selectedPeriod: RepaymentPeriodFilter) => void;
};

const periodLabels: Record<RepaymentPeriodFilter, string> = {
  [RepaymentPeriodFilter.ALL]: "全期間",
  [RepaymentPeriodFilter.THIS_MONTH]: "今月",
  [RepaymentPeriodFilter.NEXT_MONTH]: "来月",
  [RepaymentPeriodFilter.THIS_YEAR]: "今年",
};

export function PeriodFilter({ value, onChangeValue }: PeriodFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(val: RepaymentPeriodFilter) => onChangeValue(val)}
    >
      <SelectTrigger className="w-full sm:w-[140px] border-gray-300">
        <SelectValue placeholder="期間">{periodLabels[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        {Object.values(RepaymentPeriodFilter).map((period) => (
          <SelectItem key={period} value={period}>
            {periodLabels[period]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
