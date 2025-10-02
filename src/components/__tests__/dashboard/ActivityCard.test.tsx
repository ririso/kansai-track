import { ActivityCard } from "@/components/features/activity";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

// RecentActivityコンポーネントをモック
jest.mock("@/components/features/activity/RecentActivity", () => ({
  RecentActivity: () => <div data-testid="recent-activity">Recent Activity Content</div>,
}));

// lucide-reactアイコンはTabsで使用される可能性があるためモック
jest.mock("lucide-react", () => ({
  CreditCard: () => <svg data-testid="credit-card-icon" />,
  FileText: () => <svg data-testid="file-text-icon" />,
  RefreshCw: () => <svg data-testid="refresh-icon" />,
}));

describe("ActivityCard component", () => {
  it("カードタイトルが表示される", () => {
    render(<ActivityCard />);

    expect(screen.getByText("最近のアクティビティ")).toBeInTheDocument();
  });

  it("カードの説明が表示される", () => {
    render(<ActivityCard />);

    expect(screen.getByText("アカウントの最近の活動")).toBeInTheDocument();
  });

  it("タブが正しく表示される", () => {
    render(<ActivityCard />);

    expect(screen.getByText("すべて")).toBeInTheDocument();
    expect(screen.getByText("支払い")).toBeInTheDocument();
    expect(screen.getByText("更新")).toBeInTheDocument();
  });

  it("RecentActivityコンポーネントが表示される", () => {
    render(<ActivityCard />);

    expect(screen.getByTestId("recent-activity")).toBeInTheDocument();
  });

  it("デフォルトで「すべて」タブが選択されている", () => {
    render(<ActivityCard />);

    const allTab = screen.getByText("すべて");
    expect(allTab.closest('[role="tab"]')).toHaveAttribute("data-state", "active");
  });

  it("タブが表示され、クリック可能である", () => {
    render(<ActivityCard />);

    const paymentsTab = screen.getByText("支払い");
    fireEvent.click(paymentsTab);

    // タブがクリック可能であることを確認
    expect(paymentsTab.closest('[role="tab"]')).toBeInTheDocument();
  });

  it("カードに正しいCSSクラスが適用されている", () => {
    render(<ActivityCard />);

    const card = screen.getByText("最近のアクティビティ").closest('[class*="border-0"]');
    expect(card).toHaveClass("border-0", "shadow-custom", "animate-fade-in", "bg-white");
  });
});