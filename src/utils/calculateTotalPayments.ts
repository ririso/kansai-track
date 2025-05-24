import { RepaymentInfo } from "@/types/repaymentInfo";

export function calculateTotalPayments(records: RepaymentInfo[]): {
  totalDeposit: number;
  totalWithdrawal: number;
} {
  let totalCreditAmount = 0;

  // for (const record of records) {
  //   if (record.type === "deposit") {
  //     totalDeposit += record.amount;
  //   } else if (record.type === "withdrawal") {
  //     totalWithdrawal += record.amount;
  //   }
  // }

  return { totalDeposit, totalWithdrawal };
}
