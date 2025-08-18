import { Transaction } from "@/types/transaction";

export function mapJapaneseKeysToEnglish(parsedData: any[]): Transaction[] {
  const keyMap: Record<string, string> = {
    日付: "paidDate",
    内容: "transactionName",
    "出金金額(円)": "credit",
    メモ: "note",
  };
  const skipKeys = ["入金金額(円)", "残高(円)"];
  const validRows: any[] = [];
  // 行頭が"振込"で、その後に1文字以上続く
  const TRANSFER_PATTERN = /^振込\＊.+/;

  parsedData.forEach((row, index) => {
    const newRow: Record<string, any> = {};
    let isValid = true;

    for (const [jpKey, value] of Object.entries(row)) {
      if (skipKeys.includes(jpKey)) {
        // console.info(`行${index + 1}: キー「${jpKey}」は無視されました。`);
        continue;
      }
      const enKey = keyMap[jpKey];
      if (!enKey) continue;
      // console.info(`enkey` + enKey);

      if (enKey === "credit") {
        const normalizedValue =
          typeof value === "string" ? value.replace(/,/g, "") : value;
        const numValue = Number(normalizedValue);

        if (isNaN(numValue)) {
          // console.warn(
          //   `行${index + 1}の "${jpKey}" が不正な数値のためスキップ: "${value}"`
          // );
          isValid = false;
          break;
        }
        newRow[enKey] = numValue;
      } else {
        newRow[enKey] = value;
      }
    }

    if (
      isValid &&
      typeof newRow.transactionName === "string" &&
      TRANSFER_PATTERN.test(newRow.transactionName)
    ) {
      validRows.push(newRow);
    } else {
      // console.log(newRow);
    }
  });

  return validRows;
}
