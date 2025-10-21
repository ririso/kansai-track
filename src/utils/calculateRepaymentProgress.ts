import { TOTAL_SCHOLARSHIP_AMOUNT } from "@/app/(protected)/constants/scholarship";

export function calculateRepaymentProgress(totalRepayment: number): number {
  const repaymentRate = (totalRepayment / TOTAL_SCHOLARSHIP_AMOUNT) * 100;

  // 小数第1位までに丸める
  return Math.round(repaymentRate * 10) / 10;
}
