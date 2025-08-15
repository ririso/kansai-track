import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { Transaction } from "@/types/transaction";

export function reconcileScheduleWithCSV(
  csvRecords: Transaction[],
  schedules: RepaymentScheduleType[]
): RepaymentScheduleType[] {
  return schedules
    .map((schedule) => {
      const scheduleDate = new Date(schedule.scheduledDate);

      for (const csvRecord of csvRecords) {
        const paidDate = new Date(csvRecord.paidDate);
        const sameYear = paidDate.getFullYear() === scheduleDate.getFullYear();
        const sameMonth = paidDate.getMonth() === scheduleDate.getMonth();
        const sameAmount = csvRecord.credit === schedule.amount;

        if (sameYear && sameMonth && sameAmount) {
          return {
            ...schedule,
            paidDate: csvRecord.paidDate,
            status: "完了",
          };
        }
      }

      return null; // 一致しなかった場合
    })
    .filter((schedule): schedule is RepaymentScheduleType => schedule !== null);
}
