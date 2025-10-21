import { TOTAL_SCHOLARSHIP_AMOUNT } from "@/app/(protected)/constants/scholarship";

export function estimateFullYearsAndMonthsUntilRepayment(
  totalRepayment: number
): { adjustedYears: number; adjustedMonths: number } {
  const remainingScholarshipAmount = TOTAL_SCHOLARSHIP_AMOUNT - totalRepayment;

  // 毎月1万円ずつ返すので、残りの月数を算出（端数も含めるため切り上げ）
  const remainingMonths = Math.ceil(remainingScholarshipAmount / 10000);

  // 現在の日付を取得
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed (0 = January)

  // 残りの月数を現在に加算して完済予定年月を求める
  const repaymentDate = new Date(currentYear, currentMonth + remainingMonths);

  const years = repaymentDate.getFullYear() - currentYear;
  const months = repaymentDate.getMonth() - currentMonth;

  const adjustedYears = months < 0 ? years - 1 : years;
  const adjustedMonths = (months + 12) % 12;

  return {
    adjustedYears,
    adjustedMonths,
  };
}
