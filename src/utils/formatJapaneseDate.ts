export function formatJapaneseDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("/");
  return `${year}年${month}月${day}日`;
}
