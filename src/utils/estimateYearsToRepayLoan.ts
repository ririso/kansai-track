import { TOTAL_SCHOLARSHIP_AMOUNT } from "@/app/(protected)/constants/scholarship";

export function estimateYearsToRepayLoan(totalRepayment: number): string {
  const remainingScholarshipAmount = TOTAL_SCHOLARSHIP_AMOUNT - totalRepayment;

  // 毎月1万円ずつ返すので、残りの月数を算出（端数も含めるため切り上げ）
  const remainingMonths = Math.ceil(remainingScholarshipAmount / 10000);

  // 年と月に分解
  const years = Math.floor(remainingMonths / 12);
  const months = remainingMonths % 12;

  const repaymentPeriod = `${years}年と${months}か月`;

  return repaymentPeriod;
}
