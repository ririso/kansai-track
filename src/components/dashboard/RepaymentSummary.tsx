import { TOTAL_SCHOLARSHIP_AMOUNT } from "@/app/constants/scholarship";
import { estimateYearsToRepayLoan } from "@/utils/estimateYearsToRepayLoan";
import { CalendarIcon, DollarSign, LineChart, PiggyBank } from "lucide-react";
import { StatisticCard } from "../ui/StatisticCard";

// Propsの型を定義
type Props = {
  totalCreditAmount: number;
};

export default function RepaymentSummary({ totalCreditAmount }: Props) {
  const remainingAmount = TOTAL_SCHOLARSHIP_AMOUNT - totalCreditAmount;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      <StatisticCard
        title="総返済額"
        value={`¥${TOTAL_SCHOLARSHIP_AMOUNT.toLocaleString()}`}
        icon={DollarSign}
        iconColor="blue"
      />

      <StatisticCard
        title="残額"
        value={`¥${remainingAmount.toLocaleString()}`}
        icon={PiggyBank}
        iconColor="green"
      />

      <StatisticCard
        title="次回支払い"
        value={remainingAmount.toLocaleString()}
        icon={CalendarIcon}
        iconColor="orange"
        valueColor="text-orange-600"
      />

      <StatisticCard
        title="完済予定"
        value=""
        icon={LineChart}
        iconColor="blue"
        subtitle={`あと${estimateYearsToRepayLoan(totalCreditAmount)}`}
        valueColor="text-lg text-gray-900"
      />
    </div>
  );
}
