export function mapJapaneseKeysToEnglish(parsedData: any[]): any[] {
  const keyMap: Record<string, string> = {
    日付: "date",
    内容: "transactionName",
    "出金金額(円)": "credit",
    メモ: "note",
  };

  const skipKeys = ["入金金額(円)", "残高(円)"];

  const validRows: any[] = [];

  parsedData.forEach((row, index) => {
    const newRow: Record<string, any> = {};
    let isValid = true;

    for (const [jpKey, value] of Object.entries(row)) {
      if (skipKeys.includes(jpKey)) {
        console.info(`行${index + 1}: キー「${jpKey}」は無視されました。`);
        continue;
      }
      const enKey = keyMap[jpKey];
      if (!enKey) continue;

      if (enKey === "credit") {
        const normalizedValue =
          typeof value === "string" ? value.replace(/,/g, "") : value;
        const numValue = Number(normalizedValue);

        if (isNaN(numValue)) {
          console.warn(
            `行${index + 1}の "${jpKey}" が不正な数値のためスキップ: "${value}"`
          );
          isValid = false;
          break;
        }
        newRow[enKey] = numValue;
      } else {
        newRow[enKey] = value;
      }
    }

    if (isValid) {
      validRows.push(newRow);
    }
  });

  return validRows;
}
