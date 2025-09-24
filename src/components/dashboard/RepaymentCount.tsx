import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { AlertTriangle, CalendarIcon, CheckCircle, Clock } from "lucide-react";
import { StatisticCard } from "../ui/StatisticCard";

export default function RepaymentCount() {
  const {
    totalScheduleCount,
    completedScheduleCount,
    scheduledScheduleCount,
    delayedScheduleCount,
  } = useRepaymentSchedule();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      <StatisticCard
        title="総スケジュール数"
        value={totalScheduleCount}
        icon={CalendarIcon}
        iconColor="blue"
      />

      <StatisticCard
        title="完了済み"
        value={`${completedScheduleCount}件`}
        icon={CheckCircle}
        iconColor="green"
        valueColor="text-green-600"
      />

      <StatisticCard
        title="予定"
        value={`${scheduledScheduleCount}件`}
        icon={Clock}
        iconColor="orange"
        valueColor="text-orange-600"
      />

      <StatisticCard
        title="遅延"
        value={`${delayedScheduleCount}件`}
        icon={AlertTriangle}
        iconColor="red"
        valueColor="text-red-600"
      />
    </div>
  );
}
