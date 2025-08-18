import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { Transaction } from "@/types/transaction";

export function reconcileScheduleWithCSV(
  csvRecords: Transaction[],
  schedules: RepaymentScheduleType[]
): RepaymentScheduleType[] {
  const today = new Date();

  return schedules.map((schedule) => {
    const scheduleDate = new Date(schedule.scheduledDate);
    let updatedSchedule = { ...schedule };

    // --- CSVと照合 ---
    for (const csvRecord of csvRecords) {
      const paidDate = new Date(csvRecord.paidDate);
      const sameYear = paidDate.getFullYear() === scheduleDate.getFullYear();
      const sameMonth = paidDate.getMonth() === scheduleDate.getMonth();
      const sameAmount = csvRecord.credit === schedule.amount;

      if (sameYear && sameMonth && sameAmount) {
        updatedSchedule.paidDate = csvRecord.paidDate;
        updatedSchedule.status = "完了";
        return updatedSchedule;
      }
    }

    // --- CSVに一致しなかった場合の遅延判定 ---
    if (!schedule.paidDate && scheduleDate < today) {
      updatedSchedule.status = "遅延";
    }

    return updatedSchedule;
  });
}
