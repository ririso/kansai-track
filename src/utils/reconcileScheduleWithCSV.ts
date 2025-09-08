import { PaymentCategory } from "@/types/enums/paymentCategory";
import { PaymentMethod } from "@/types/enums/paymentMethod";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { repaymentScheduleTypeForCSV } from "@/types/repaymentScheduleTypeForCSV";
import { Transaction } from "@/types/transaction";

export function reconcileScheduleWithCSV(
  csvRecords: Transaction[],
  schedules: RepaymentScheduleType[]
): repaymentScheduleTypeForCSV[] {
  const today = new Date();

  const updatedSchedules: repaymentScheduleTypeForCSV[] = schedules
    .map((schedule) => {
      const scheduleDate = new Date(schedule.scheduledDate);

      // CSV で一致するものを検索
      const matchedCSV = csvRecords.find(
        (csv) =>
          (csv.credit === schedule.amount &&
            new Date(csv.paidDate).getFullYear() ===
              scheduleDate.getFullYear() &&
            new Date(csv.paidDate).getMonth() === scheduleDate.getMonth() &&
            schedule.status === RepaymentStatus.Scheduled) ||
          schedule.status === RepaymentStatus.Delayed
      );

      // 予定or遅延しているものを完了状態に変更する
      if (matchedCSV) {
        return {
          id: schedule.id,
          amount: schedule.amount,
          paidDate: matchedCSV.paidDate,
          scheduledDate: schedule.scheduledDate,
          status: RepaymentStatus.Completed,
          beforeStatus: schedule.status,
          paymentMethod: PaymentMethod.BankTransfer,
          paymentCategory: PaymentCategory.Normal,
          hasCSVUpdate: true,
        } as repaymentScheduleTypeForCSV;
      }

      // 遅延判定を行う
      // 予定だったものを遅延として登録する
      if (
        schedule.status === RepaymentStatus.Scheduled &&
        !schedule.paidDate &&
        scheduleDate < today
      ) {
        return {
          id: schedule.id,
          amount: schedule.amount,
          paidDate: "",
          scheduledDate: schedule.scheduledDate,
          status: RepaymentStatus.Delayed,
          beforeStatus: RepaymentStatus.Scheduled,
          paymentMethod: PaymentMethod.BankTransfer,
          paymentCategory: PaymentCategory.Normal,
          hasCSVUpdate: true,
        } as repaymentScheduleTypeForCSV;
      }

      return null;
    })
    .filter(
      (schedule): schedule is repaymentScheduleTypeForCSV => schedule !== null
    );

  return updatedSchedules;
}
