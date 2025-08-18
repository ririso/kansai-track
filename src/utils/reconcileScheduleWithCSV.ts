import { PaymentCategory } from "@/types/enums/paymentCategory";
import { PaymentMethod } from "@/types/enums/paymentMethod";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { Transaction } from "@/types/transaction";

export function reconcileScheduleWithCSV(
  csvRecords: Transaction[],
  schedules: RepaymentScheduleType[]
): RepaymentScheduleType[] {
  const today = new Date();

  let updatedSchedules: RepaymentScheduleType[] = schedules.map((schedule) => {
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
        updatedSchedule.status = RepaymentStatus.Completed;
        (updatedSchedule.paymentMethod = PaymentMethod.BankTransfer),
          (updatedSchedule.paymentCategory = PaymentCategory.Normal);
        return updatedSchedule;
      }
    }

    // --- CSVに一致しなかったかつ予定状態のものは期限が過ぎているので遅延判定 ---
    if (!schedule.paidDate && scheduleDate < today) {
      updatedSchedule.status = RepaymentStatus.Delayed;
    }

    return updatedSchedule;
  });

  // --- 特別支払いの登録 ---
  const specialPayments = csvRecords.filter((record) =>
    record.note?.includes("特別")
  );
  console.log("特別" + specialPayments);

  for (const special of specialPayments) {
    const alreadyExists = updatedSchedules.some(
      (updatedSchedule) =>
        updatedSchedule.paidDate === special.paidDate &&
        updatedSchedule.amount === special.credit &&
        updatedSchedule.status === RepaymentStatus.Completed
    );

    if (!alreadyExists) {
      updatedSchedules.push({
        id: `special-${special.paidDate}-${special.credit}`,
        scheduledDate: special.paidDate,
        paidDate: special.paidDate,
        amount: special.credit,
        status: RepaymentStatus.Completed,
        paymentMethod: PaymentMethod.BankTransfer,
        paymentCategory: PaymentCategory.Special,
      });
    }
  }

  return updatedSchedules;
}
