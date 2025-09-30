import { TOTAL_SCHOLARSHIP_AMOUNT } from "@/app/constants/scholarship";

/**
 * 残額と月額返済額から完済予定日を計算する
 * @param totalCreditAmount 既に返済した総額
 * @param monthlyPayment 月額返済額（デフォルト: 15,000円）
 * @returns 完済予定日の文字列 (例: "2032年11月")
 */
export function calculateCompletionDate(
  totalCreditAmount: number,
  monthlyPayment: number = 15000
): string {
  const remainingAmount = TOTAL_SCHOLARSHIP_AMOUNT - totalCreditAmount;

  if (remainingAmount <= 0) {
    return "完済済み";
  }

  const monthsRemaining = Math.ceil(remainingAmount / monthlyPayment);
  const currentDate = new Date();
  const completionDate = new Date(currentDate);

  completionDate.setMonth(completionDate.getMonth() + monthsRemaining);

  const year = completionDate.getFullYear();
  const month = completionDate.getMonth() + 1;

  return `${year}年${month}月`;
}