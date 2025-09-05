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

  // --- CSVと照合して、変更があったものだけ updatedSchedules に入れる ---
  const updatedSchedules: repaymentScheduleTypeForCSV[] = schedules.map(
    (schedule) => {
      const scheduleDate = new Date(schedule.scheduledDate);
      const updatedSchedule: repaymentScheduleTypeForCSV = {
        ...schedule,
        beforeStatus: schedule.status,
        hasCSVUpdate: false,
      };

      for (const csvRecord of csvRecords) {
        const paidDate = new Date(csvRecord.paidDate);
        const sameYear = paidDate.getFullYear() === scheduleDate.getFullYear();
        const sameMonth = paidDate.getMonth() === scheduleDate.getMonth();
        const sameAmount = csvRecord.credit === schedule.amount;

        if (
          sameYear &&
          sameMonth &&
          sameAmount &&
          schedule.status === RepaymentStatus.Scheduled
        ) {
          updatedSchedule.paidDate = csvRecord.paidDate;
          updatedSchedule.status = RepaymentStatus.Completed;
          updatedSchedule.paymentMethod = PaymentMethod.BankTransfer;
          updatedSchedule.paymentCategory = PaymentCategory.Normal;
          updatedSchedule.hasCSVUpdate = true;
          break; // CSVで一致したらこれ以上ループしない
        }
      }

      // CSVに一致せず予定状態で期限切れなら遅延にする
      if (
        !updatedSchedule.hasCSVUpdate &&
        !schedule.paidDate &&
        scheduleDate < today
      ) {
        updatedSchedule.status = RepaymentStatus.Delayed;
      }

      return updatedSchedule;
    }
  );

  // --- 特別支払いの登録 ---
  const specialPayments = csvRecords.filter((record) =>
    record.note?.includes("特別")
  );

  for (const special of specialPayments) {
    const alreadyExists = updatedSchedules.some(
      (s) =>
        s.paidDate === special.paidDate &&
        s.amount === special.credit &&
        s.status === RepaymentStatus.Completed
    );

    if (!alreadyExists) {
      updatedSchedules.push({
        id: `special-${special.paidDate}-${special.credit}`,
        scheduledDate: special.paidDate,
        paidDate: special.paidDate,
        amount: special.credit,
        status: RepaymentStatus.Completed,
        beforeStatus: RepaymentStatus.Completed,
        paymentMethod: PaymentMethod.BankTransfer,
        paymentCategory: PaymentCategory.Special,
        hasCSVUpdate: true,
      });
    }
  }

  console.log("フィルターのupdatedSchedules");
  console.log(updatedSchedules.filter((s) => s.hasCSVUpdate));

  // --- 更新があったものだけ返す ---
  return updatedSchedules.filter((s) => s.hasCSVUpdate);
}
