import DashboardCard from "@/components/dashboard/DashboardCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// RepaymentScheduleコンポーネントをモック
jest.mock("@/components/dashboard/RepaymentScheduleTable", () => ({
  RepaymentSchedule: () => <div data-testid="repayment-schedule">Repayment Schedule Content</div>,
}));

// Next.jsのLinkコンポーネントをモック
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("DashboardCard component", () => {
  it("カードタイトルが表示される", () => {
    render(<DashboardCard />);

    expect(screen.getByText("返済スケジュール")).toBeInTheDocument();
  });

  it("カードの説明が表示される", () => {
    render(<DashboardCard />);

    expect(screen.getByText("今後の返済予定")).toBeInTheDocument();
  });

  it("「すべて表示」ボタンが表示される", () => {
    render(<DashboardCard />);

    const button = screen.getByText("すべて表示");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("border-blue-200", "text-blue-600", "hover:bg-blue-50");
  });

  it("「すべて表示」ボタンが正しいリンクになっている", () => {
    render(<DashboardCard />);

    const link = screen.getByText("すべて表示").closest("a");
    expect(link).toHaveAttribute("href", "/schedule");
  });

  it("RepaymentScheduleコンポーネントが表示される", () => {
    render(<DashboardCard />);

    expect(screen.getByTestId("repayment-schedule")).toBeInTheDocument();
  });

  it("カードに正しいCSSクラスが適用されている", () => {
    render(<DashboardCard />);

    const card = screen.getByText("返済スケジュール").closest('[class*="lg:col-span-2"]');
    expect(card).toHaveClass("lg:col-span-2", "border-0", "shadow-custom", "animate-fade-in", "bg-white");
  });

  it("ヘッダーのレイアウトが正しい", () => {
    render(<DashboardCard />);

    const header = screen.getByText("返済スケジュール").closest('[class*="flex-row"]');
    expect(header).toHaveClass("flex", "flex-row", "items-center", "justify-between");
  });
});