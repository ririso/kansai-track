import RepaymentSummary from "@/components/dashboard/RepaymentSummary";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// estimateYearsToRepayLoan関数をモック
jest.mock("@/utils/estimateYearsToRepayLoan", () => ({
  estimateYearsToRepayLoan: jest.fn((amount: number) => {
    // 500,000円返済済みの場合、残り5年として計算
    return amount === 500000 ? "5年" : "10年";
  }),
}));

// constantsをモック
jest.mock("@/app/constants/scholarship", () => ({
  TOTAL_SCHOLARSHIP_AMOUNT: 1000000,
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  CalendarIcon: () => <svg data-testid="calendar-icon" />,
  DollarSign: () => <svg data-testid="dollar-sign-icon" />,
  LineChart: () => <svg data-testid="line-chart-icon" />,
  PiggyBank: () => <svg data-testid="piggy-bank-icon" />,
}));

describe("RepaymentSummary component", () => {
  it("総返済額が表示される", () => {
    render(<RepaymentSummary totalCreditAmount={500000} />);

    expect(screen.getByText("総返済額")).toBeInTheDocument();
    expect(screen.getByText("¥1,000,000")).toBeInTheDocument();
  });

  it("残額が正しく計算されて表示される", () => {
    render(<RepaymentSummary totalCreditAmount={500000} />);

    expect(screen.getByText("残額")).toBeInTheDocument();
    expect(screen.getByText("¥500,000")).toBeInTheDocument(); // 1,000,000 - 500,000
  });

  it("次回支払い額が表示される", () => {
    render(<RepaymentSummary totalCreditAmount={500000} />);

    expect(screen.getByText("次回支払い")).toBeInTheDocument();
    // 次回支払い額も残額と同じ値が表示されている
    const nextPaymentElements = screen.getAllByText("500,000");
    expect(nextPaymentElements.length).toBeGreaterThan(0);
  });

  it("完済予定期間が表示される", () => {
    render(<RepaymentSummary totalCreditAmount={500000} />);

    expect(screen.getByText("完済予定")).toBeInTheDocument();
    expect(screen.getByText("あと5年")).toBeInTheDocument();
  });

  it("各アイコンが表示される", () => {
    render(<RepaymentSummary totalCreditAmount={500000} />);

    expect(screen.getByTestId("dollar-sign-icon")).toBeInTheDocument();
    expect(screen.getByTestId("piggy-bank-icon")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("line-chart-icon")).toBeInTheDocument();
  });

  it("4つのカードが表示される", () => {
    render(<RepaymentSummary totalCreditAmount={500000} />);

    const cards = screen.getAllByText(/総返済額|残額|次回支払い|完済予定/);
    expect(cards).toHaveLength(4);
  });

  it("金額が正しくカンマ区切りでフォーマットされている", () => {
    render(<RepaymentSummary totalCreditAmount={500000} />);

    // 総返済額
    expect(screen.getByText("¥1,000,000")).toBeInTheDocument();
    // 残額
    expect(screen.getByText("¥500,000")).toBeInTheDocument();
  });

  it("異なる返済額での計算が正しい", () => {
    render(<RepaymentSummary totalCreditAmount={300000} />);

    // 残額: 1,000,000 - 300,000 = 700,000
    expect(screen.getByText("¥700,000")).toBeInTheDocument();
    // 完済予定期間
    expect(screen.getByText("あと10年")).toBeInTheDocument();
  });

  it("グリッドレイアウトが適用されている", () => {
    render(<RepaymentSummary totalCreditAmount={500000} />);

    const gridContainer = screen.getByText("総返済額").closest('[class*="grid"]');
    expect(gridContainer).toHaveClass("grid", "gap-4", "md:grid-cols-2", "lg:grid-cols-4");
  });

  it("各カードに正しいスタイルが適用されている", () => {
    render(<RepaymentSummary totalCreditAmount={500000} />);

    const cards = screen.getAllByText(/総返済額|残額|次回支払い|完済予定/).map(text =>
      text.closest('[class*="border-0"]')
    );

    cards.forEach(card => {
      expect(card).toHaveClass("border-0", "card-hover", "animate-fade-in", "bg-white");
    });
  });
});