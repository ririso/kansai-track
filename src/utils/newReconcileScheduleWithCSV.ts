import { PaymentCategory } from "@/types/enums/paymentCategory";
import { PaymentMethod } from "@/types/enums/paymentMethod";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";
import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { repaymentScheduleTypeForCSV } from "@/types/repaymentScheduleTypeForCSV";
import { Transaction } from "@/types/transaction";

export function newReconcileScheduleWithCSV(
  csvRecords: Transaction[],
  schedules: RepaymentScheduleType[]
): repaymentScheduleTypeForCSV[] {
  const today = new Date();

  const updatedNormalSchedules: repaymentScheduleTypeForCSV[] = []; // ここにデータを追加する

  // スケジュールでループする
  // CSVを取り出して、年月と支払い額が一致かつ支払いステータスが予定ものをに一致するものを探す。
  // 1.一致した場合はスケジュールのステータスを支払い済みに変更と支払日を追加する。
  // 2.一致しなかった場合に、スケジュールが予定かつ支払い日時が過ぎている場合はそのスケジュールを遅延に変更する。

  const updatedSchedules: repaymentScheduleTypeForCSV[] = schedules.map(
    (schedule) => {
      const scheduleDate = new Date(schedule.scheduledDate);

      // CSV で一致するものを検索
      const matchedCSV = csvRecords.find(
        (csv) =>
          csv.credit === schedule.amount &&
          new Date(csv.paidDate).getFullYear() === scheduleDate.getFullYear() &&
          new Date(csv.paidDate).getMonth() === scheduleDate.getMonth() &&
          schedule.status === RepaymentStatus.Scheduled
      );

      if (matchedCSV) {
        return {
          id: schedule.id,
          amount: schedule.amount,
          paidDate: matchedCSV.paidDate,
          scheduledDate: schedule.scheduledDate,
          status: RepaymentStatus.Completed,
          beforeStatus: RepaymentStatus.Scheduled,
          paymentMethod: PaymentMethod.BankTransfer,
          paymentCategory: PaymentCategory.Normal,
          hasCSVUpdate: true,
        };
      }

      // CSV に一致せず期限切れなら遅延
      if (!schedule.paidDate && scheduleDate < new Date()) {
        return {
          id: schedule.id,
          amount: schedule.amount,
          paidDate: "", // 支払いなし
          scheduledDate: schedule.scheduledDate,
          status: RepaymentStatus.Delayed,
          beforeStatus: RepaymentStatus.Scheduled,
          paymentMethod: PaymentMethod.BankTransfer, // 空にしたい場合は optional にする
          paymentCategory: PaymentCategory.Normal, // 同上
          hasCSVUpdate: true,
        };
      }

      // 更新不要なら null を返して最後にFilterで弾く
      return null;
    }
  );
}
