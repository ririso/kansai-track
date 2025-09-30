import { calculateRepaymentProgress } from "../calculateRepaymentProgress";

// 定数をモック
jest.mock("@/app/constants/scholarship", () => ({
  TOTAL_SCHOLARSHIP_AMOUNT: 2000000, // 2,000,000円としてテスト
}));

describe("calculateRepaymentProgress", () => {
  it("返済率を正しく計算する", () => {
    expect(calculateRepaymentProgress(0)).toBe(0);
    expect(calculateRepaymentProgress(200000)).toBe(10.0); // 10%
    expect(calculateRepaymentProgress(1000000)).toBe(50.0); // 50%
    expect(calculateRepaymentProgress(2000000)).toBe(100.0); // 100%
  });

  it("小数点第1位まで正しく丸める", () => {
    expect(calculateRepaymentProgress(333333)).toBe(16.7); // 16.66665...
    expect(calculateRepaymentProgress(666666)).toBe(33.3); // 33.3333...
  });

  it("100%を超える場合も正しく計算する", () => {
    expect(calculateRepaymentProgress(2200000)).toBe(110.0); // 110%
  });

  it("0円の場合は0%を返す", () => {
    expect(calculateRepaymentProgress(0)).toBe(0);
  });

  it("負の値の場合も計算する", () => {
    expect(calculateRepaymentProgress(-100000)).toBe(-5.0);
  });
});