import { RepaymentScheduleType } from "@/types/repaymentScheduleType";

export function getClosestSchedules(
  schedules: RepaymentScheduleType[],
  targetDate: Date,
  maxDisplayCount: number
): RepaymentScheduleType[] {
  const sorted = [...schedules].sort(
    (a, b) =>
      new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
  );

  let closestIndex = 0;
  let minDiff = Infinity;
  sorted.forEach((schedule, index) => {
    const diff = Math.abs(
      new Date(schedule.scheduledDate).getTime() - targetDate.getTime()
    );
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = index;
    }
  });

  const half = Math.floor(maxDisplayCount / 2);
  const start = Math.max(0, closestIndex - half);
  const end = start + maxDisplayCount;

  return sorted.slice(start, end);
}
