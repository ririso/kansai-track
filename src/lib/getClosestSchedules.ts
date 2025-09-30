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
  let start = Math.max(0, closestIndex - half);
  let end = start + maxDisplayCount;

  // 配列の範囲を超える場合は調整
  if (end > sorted.length) {
    end = sorted.length;
    start = Math.max(0, end - maxDisplayCount);
  }

  return sorted.slice(start, end);
}
