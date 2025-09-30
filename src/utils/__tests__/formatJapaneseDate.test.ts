import { formatJapaneseDate } from "../formatJapaneseDate";

describe("formatJapaneseDate", () => {
  it("正しい日付形式を日本語にフォーマットする", () => {
    expect(formatJapaneseDate("2024/01/15")).toBe("2024年01月15日");
    expect(formatJapaneseDate("2023/12/31")).toBe("2023年12月31日");
    expect(formatJapaneseDate("2025/06/01")).toBe("2025年06月01日");
  });

  it("単桁の月日も正しく処理する", () => {
    expect(formatJapaneseDate("2024/1/5")).toBe("2024年1月5日");
    expect(formatJapaneseDate("2024/10/1")).toBe("2024年10月1日");
  });

  it("うるう年も正しく処理する", () => {
    expect(formatJapaneseDate("2024/02/29")).toBe("2024年02月29日");
  });

  it("年始年末の日付も正しく処理する", () => {
    expect(formatJapaneseDate("2024/01/01")).toBe("2024年01月01日");
    expect(formatJapaneseDate("2024/12/31")).toBe("2024年12月31日");
  });
});