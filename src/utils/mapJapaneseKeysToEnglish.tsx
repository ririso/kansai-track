import { Transaction } from "@/types/transaction";
import { JapaneseCsvRow } from "@/types/csv";

type PartialTransaction = {
  paidDate?: string;
  transactionName?: string;
  credit?: number;
  note?: string;
};

type JapaneseKey = keyof JapaneseCsvRow;
type EnglishKey = keyof Transaction;

export function mapJapaneseKeysToEnglish(parsedData: JapaneseCsvRow[]): Transaction[] {
  const keyMap: Record<JapaneseKey, EnglishKey> = {
    日付: "paidDate",
    内容: "transactionName",
    "出金金額(円)": "credit",
    メモ: "note",
  };
  const skipKeys: readonly JapaneseKey[] = ["入金金額(円)", "残高(円)"] as const;
  const validRows: Transaction[] = [];
  // 行頭が"振込"で、その後に1文字以上続く
  const TRANSFER_PATTERN = /^振込＊.+/;

  parsedData.forEach((row) => {
    const newRow: PartialTransaction = {};
    let isValid = true;

    for (const [jpKey, value] of Object.entries(row) as [JapaneseKey, string | number][]) {
      if (skipKeys.includes(jpKey)) {
        continue;
      }
      const enKey = keyMap[jpKey];
      if (!enKey) continue;

      if (enKey === "credit") {
        const normalizedValue =
          typeof value === "string" ? value.replace(/,/g, "") : value;
        const numValue = Number(normalizedValue);

        if (isNaN(numValue)) {
          isValid = false;
          break;
        }
        newRow[enKey] = numValue;
      } else {
        newRow[enKey] = value as string;
      }
    }

    if (
      isValid &&
      typeof newRow.transactionName === "string" &&
      TRANSFER_PATTERN.test(newRow.transactionName) &&
      typeof newRow.credit === "number" &&
      typeof newRow.paidDate === "string"
    ) {
      validRows.push(newRow as Transaction);
    }
  });

  return validRows;
}
