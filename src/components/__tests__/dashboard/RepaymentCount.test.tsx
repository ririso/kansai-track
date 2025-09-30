import RepaymentCount from "@/components/dashboard/RepaymentCount";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// useRepaymentScheduleフックをモック
jest.mock("@/contexts/RepaymentContext", () => ({
  useRepaymentSchedule: () => ({
    totalCreditAmount: 500000,
    totalScheduleCount: 120,
    completedScheduleCount: 50,
    scheduledScheduleCount: 60,
    delayedScheduleCount: 10,
  }),
}));

// constantsをモック
jest.mock("@/app/constants/scholarship", () => ({
  TOTAL_SCHOLARSHIP_AMOUNT: 1000000,
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  AlertTriangle: () => <svg data-testid="alert-triangle-icon" />,
  CalendarIcon: () => <svg data-testid="calendar-icon" />,
  CheckCircle: () => <svg data-testid="check-circle-icon" />,
  Clock: () => <svg data-testid="clock-icon" />,
}));

describe("RepaymentCount component", () => {
  it("総スケジュール数が表示される", () => {
    render(<RepaymentCount />);

    expect(screen.getByText("総スケジュール数")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  it("完了済み件数が表示される", () => {
    render(<RepaymentCount />);

    expect(screen.getByText("完了済み")).toBeInTheDocument();
    expect(screen.getByText("50件")).toBeInTheDocument();
  });

  it("予定件数が表示される", () => {
    render(<RepaymentCount />);

    expect(screen.getByText("予定")).toBeInTheDocument();
    expect(screen.getByText("60件")).toBeInTheDocument();
  });

  it("遅延件数が表示される", () => {
    render(<RepaymentCount />);

    expect(screen.getByText("遅延")).toBeInTheDocument();
    expect(screen.getByText("10件")).toBeInTheDocument();
  });

  it("各アイコンが表示される", () => {
    render(<RepaymentCount />);

    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("check-circle-icon")).toBeInTheDocument();
    expect(screen.getByTestId("clock-icon")).toBeInTheDocument();
    expect(screen.getByTestId("alert-triangle-icon")).toBeInTheDocument();
  });

  it("4つのカードが表示される", () => {
    render(<RepaymentCount />);

    const cards = screen.getAllByText(/総スケジュール数|完了済み|予定|遅延/);
    expect(cards).toHaveLength(4);
  });

  it("各カードに正しいスタイルが適用されている", () => {
    render(<RepaymentCount />);

    // 完了済みカードの文字色確認
    const completedCount = screen.getByText("50件");
    expect(completedCount).toHaveClass("text-green-600");

    // 予定カードの文字色確認
    const scheduledCount = screen.getByText("60件");
    expect(scheduledCount).toHaveClass("text-orange-600");

    // 遅延カードの文字色確認
    const delayedCount = screen.getByText("10件");
    expect(delayedCount).toHaveClass("text-red-600");
  });

  it("グリッドレイアウトが適用されている", () => {
    render(<RepaymentCount />);

    const gridContainer = screen.getByText("総スケジュール数").closest('[class*="grid"]');
    expect(gridContainer).toHaveClass("grid", "gap-4", "md:grid-cols-2", "lg:grid-cols-4");
  });
});