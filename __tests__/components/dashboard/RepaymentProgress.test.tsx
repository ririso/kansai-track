import RepaymentProgress from "@/components/dashboard/RepaymentProgress";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// calculateRepaymentProgress関数をモック
jest.mock("@/utils/calculateRepaymentProgress", () => ({
  calculateRepaymentProgress: jest.fn((amount: number) => {
    // 500,000円の場合50%の進捗として計算
    return amount === 500000 ? 50 : Math.round((amount / 1000000) * 100);
  }),
}));

// constantsをモック
jest.mock("@/app/constants/scholarship", () => ({
  TOTAL_SCHOLARSHIP_AMOUNT: 1000000,
}));

// Radix UIのProgressをモック
jest.mock("@radix-ui/react-progress", () => ({
  Progress: ({ value, className, children }: any) => (
    <div data-testid="progress-bar" data-value={value} className={className}>
      {children}
    </div>
  ),
}));

describe("RepaymentProgress component", () => {
  it("タイトルが表示される", () => {
    render(<RepaymentProgress totalCreditAmount={500000} />);

    expect(screen.getByText("返済進捗状況")).toBeInTheDocument();
  });

  it("進捗率がパーセンテージで表示される", () => {
    render(<RepaymentProgress totalCreditAmount={500000} />);

    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("進捗率が説明文に表示される", () => {
    render(<RepaymentProgress totalCreditAmount={500000} />);

    expect(screen.getByText("これまでに50%返済済み")).toBeInTheDocument();
  });

  it("「完了」ラベルが表示される", () => {
    render(<RepaymentProgress totalCreditAmount={500000} />);

    expect(screen.getByText("完了")).toBeInTheDocument();
  });

  it("プログレスバーが正しい値で表示される", () => {
    render(<RepaymentProgress totalCreditAmount={500000} />);

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveAttribute("data-value", "50");
  });

  it("金額の目盛りが表示される", () => {
    render(<RepaymentProgress totalCreditAmount={500000} />);

    expect(screen.getByText("¥0")).toBeInTheDocument();
    expect(screen.getByText("¥500,000")).toBeInTheDocument(); // TOTAL_SCHOLARSHIP_AMOUNT / 2
    expect(screen.getByText("¥1,000,000")).toBeInTheDocument(); // TOTAL_SCHOLARSHIP_AMOUNT
  });

  it("プログレスバーのスタイルが正しく適用される", () => {
    render(<RepaymentProgress totalCreditAmount={500000} />);

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveClass("h-3", "bg-gray-200");
  });

  it("カードに正しいスタイルが適用されている", () => {
    render(<RepaymentProgress totalCreditAmount={500000} />);

    const card = screen.getByText("返済進捗状況").closest('[class*="border-0"]');
    expect(card).toHaveClass("border-0", "shadow-custom", "animate-fade-in", "bg-white");
  });

  it("異なる金額での進捗率計算が正しい", () => {
    render(<RepaymentProgress totalCreditAmount={250000} />);

    // 250,000円の場合は25%になる
    expect(screen.getByText("25%")).toBeInTheDocument();
    expect(screen.getByText("これまでに25%返済済み")).toBeInTheDocument();
  });
});