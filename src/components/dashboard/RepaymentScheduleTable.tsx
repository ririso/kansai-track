import { useRepaymentSchedule } from "@/contexts/RepaymentContext";
import { getClosestSchedules } from "@/lib/getClosestSchedules";
import { RepaymentTable } from "../ui/RepaymentTable";

export function RepaymentSchedule() {
  const { schedules, isLoading, error } = useRepaymentSchedule();
  const today = new Date();
  const maxDisplayCount = 5;
  const visibleSchedules = getClosestSchedules(
    schedules,
    today,
    maxDisplayCount
  );

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <RepaymentTable
      schedules={visibleSchedules}
      showDummyRows={false}
      tableFixed={false}
    />
  );
}
