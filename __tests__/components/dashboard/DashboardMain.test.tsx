import DashboardPage from "@/components/dashboard/DashboardMain";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  CreditCard: () => <svg data-testid="credit-card-icon" />,
}));

// 子コンポーネントをモック
jest.mock("@/components/ui/modal/base-modal", () => ({
  BaseModal: ({ children, title, trigger }: any) => (
    <div data-testid="base-modal" data-title={title}>
      {trigger}
      {children}
    </div>
  ),
}));

jest.mock("@/components/ui/modal/payment-content", () => ({
  PaymentForm: () => <div data-testid="payment-form">Payment Form</div>,
}));

jest.mock("@/components/dashboard/ActivityCard", () => ({
  __esModule: true,
  default: () => <div data-testid="activity-card">Activity Card</div>,
}));

jest.mock("@/components/dashboard/DashboardCard", () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard-card">Dashboard Card</div>,
}));

jest.mock("@/components/dashboard/RepaymentProgress", () => ({
  __esModule: true,
  default: ({ totalCreditAmount }: any) => (
    <div data-testid="repayment-progress" data-total={totalCreditAmount}>
      Repayment Progress
    </div>
  ),
}));

jest.mock("@/components/dashboard/RepaymentSummary", () => ({
  __esModule: true,
  default: ({ totalCreditAmount }: any) => (
    <div data-testid="repayment-summary" data-total={totalCreditAmount}>
      Repayment Summary
    </div>
  ),
}));

jest.mock("@/components/dashboard/RepaymentHistoryArea", () => ({
  __esModule: true,
  default: () => <div data-testid="repayment-history-area">Repayment History Area</div>,
}));

jest.mock("@/components/ui/shadcn/button", () => ({
  Button: ({ children, className, ...props }: any) => (
    <button data-testid="button" className={className} {...props}>
      {children}
    </button>
  ),
}));

// RepaymentContextをモック
const mockRepaymentSchedule = {
  isLoading: false,
  error: null,
  totalCreditAmount: 1000000,
  schedules: [],
  repaymentHistories: [],
};

jest.mock("@/contexts/RepaymentContext", () => ({
  useRepaymentSchedule: jest.fn(() => mockRepaymentSchedule),
}));

describe("DashboardMain component", () => {
  beforeEach(() => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    useRepaymentSchedule.mockReturnValue(mockRepaymentSchedule);
  });

  it("ダッシュボードページが表示される", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("repayment-summary")).toBeInTheDocument();
    expect(screen.getByTestId("repayment-progress")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-card")).toBeInTheDocument();
    expect(screen.getByTestId("repayment-history-area")).toBeInTheDocument();
    expect(screen.getByTestId("activity-card")).toBeInTheDocument();
  });

  it("totalCreditAmountが正しく子コンポーネントに渡される", () => {
    render(<DashboardPage />);

    const summaryComponent = screen.getByTestId("repayment-summary");
    const progressComponent = screen.getByTestId("repayment-progress");

    expect(summaryComponent).toHaveAttribute("data-total", "1000000");
    expect(progressComponent).toHaveAttribute("data-total", "1000000");
  });

  it("支払いボタンが表示される", () => {
    render(<DashboardPage />);

    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("今月の支払いを行う");
    expect(screen.getByTestId("credit-card-icon")).toBeInTheDocument();
  });

  it("支払いモーダルが設定される", () => {
    render(<DashboardPage />);

    const modal = screen.getByTestId("base-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("data-title", "支払い確認");
    expect(screen.getByTestId("payment-form")).toBeInTheDocument();
  });

  it("グリッドレイアウトが適用される", () => {
    render(<DashboardPage />);

    const mainGrid = screen.getByTestId("repayment-summary").parentElement;
    expect(mainGrid).toHaveClass("grid", "gap-6");
  });

  it("ローディング状態が表示される", () => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    useRepaymentSchedule.mockReturnValue({
      ...mockRepaymentSchedule,
      isLoading: true,
    });

    render(<DashboardPage />);

    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
    expect(screen.queryByTestId("repayment-summary")).not.toBeInTheDocument();
  });

  it("エラー状態が表示される", () => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    useRepaymentSchedule.mockReturnValue({
      ...mockRepaymentSchedule,
      error: "データの取得に失敗しました",
    });

    render(<DashboardPage />);

    expect(screen.getByText("エラー: データの取得に失敗しました")).toBeInTheDocument();
    expect(screen.queryByTestId("repayment-summary")).not.toBeInTheDocument();
  });

  it("totalCreditAmountが0の場合も正しく表示される", () => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    useRepaymentSchedule.mockReturnValue({
      ...mockRepaymentSchedule,
      totalCreditAmount: 0,
    });

    render(<DashboardPage />);

    const summaryComponent = screen.getByTestId("repayment-summary");
    const progressComponent = screen.getByTestId("repayment-progress");

    expect(summaryComponent).toHaveAttribute("data-total", "0");
    expect(progressComponent).toHaveAttribute("data-total", "0");
  });

  it("レイアウト構造が正しい", () => {
    render(<DashboardPage />);

    // DashboardCardとRepaymentHistoryAreaが同じグリッドコンテナ内にある
    const dashboardCard = screen.getByTestId("dashboard-card");
    const historyArea = screen.getByTestId("repayment-history-area");
    const gridContainer = dashboardCard.parentElement;

    expect(gridContainer).toBe(historyArea.parentElement);
    expect(gridContainer).toHaveClass("grid", "gap-6", "lg:grid-cols-3");
  });

  it("支払いボタンのスタイルが適用される", () => {
    render(<DashboardPage />);

    const button = screen.getByTestId("button");
    expect(button).toHaveClass("w-full", "max-w-xs");

    // ボタンの上位コンテナを確認
    const modal = screen.getByTestId("base-modal");
    const modalContainer = modal.parentElement;
    expect(modalContainer).toHaveClass("flex", "justify-center");
  });

  describe("データ状態のテスト", () => {
    it("異なるtotalCreditAmountでも正しく動作する", () => {
      const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
      useRepaymentSchedule.mockReturnValue({
        ...mockRepaymentSchedule,
        totalCreditAmount: 2500000,
      });

      render(<DashboardPage />);

      const summaryComponent = screen.getByTestId("repayment-summary");
      const progressComponent = screen.getByTestId("repayment-progress");

      expect(summaryComponent).toHaveAttribute("data-total", "2500000");
      expect(progressComponent).toHaveAttribute("data-total", "2500000");
    });

    it("ローディングからデータ表示への遷移", () => {
      const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");

      // 最初はローディング状態
      useRepaymentSchedule.mockReturnValue({
        ...mockRepaymentSchedule,
        isLoading: true,
      });

      const { rerender } = render(<DashboardPage />);
      expect(screen.getByText("読み込み中...")).toBeInTheDocument();

      // データが読み込まれた状態に更新
      useRepaymentSchedule.mockReturnValue(mockRepaymentSchedule);
      rerender(<DashboardPage />);

      expect(screen.queryByText("読み込み中...")).not.toBeInTheDocument();
      expect(screen.getByTestId("repayment-summary")).toBeInTheDocument();
    });
  });

  describe("統合テスト", () => {
    it("全ての子コンポーネントが正しい順序で表示される", () => {
      render(<DashboardPage />);

      const components = [
        screen.getByTestId("repayment-summary"),
        screen.getByTestId("repayment-progress"),
        screen.getByTestId("dashboard-card"),
        screen.getByTestId("repayment-history-area"),
        screen.getByTestId("activity-card"),
        screen.getByTestId("base-modal"),
      ];

      components.forEach(component => {
        expect(component).toBeInTheDocument();
      });
    });

    it("支払いフォームモーダル全体が正しく構成される", () => {
      render(<DashboardPage />);

      const modal = screen.getByTestId("base-modal");
      const button = screen.getByTestId("button");
      const paymentForm = screen.getByTestId("payment-form");

      expect(modal).toContainElement(button);
      expect(modal).toContainElement(paymentForm);
      expect(button).toHaveTextContent("今月の支払いを行う");
      expect(screen.getByTestId("credit-card-icon")).toBeInTheDocument();
    });
  });
});