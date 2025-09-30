import { RepaymentHistory } from "@/components/dashboard/RepaymentHistory";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RepaymentStatus } from "@/types/enums/repaymentStatus";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Badgeコンポーネントをモック
jest.mock("@/components/ui/shadcn/badge", () => ({
  Badge: ({ children, variant, className, ...props }: any) => (
    <span
      data-testid="badge"
      data-variant={variant}
      className={className}
      {...props}
    >
      {children}
    </span>
  ),
}));

// Cardコンポーネントをモック
jest.mock("@/components/ui/shadcn/card", () => ({
  Card: ({ children, className, ...props }: any) => (
    <div data-testid="card" className={className} {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div data-testid="card-content" className={className} {...props}>
      {children}
    </div>
  ),
}));

// RepaymentStatusをモック
jest.mock("@/types/enums/repaymentStatus", () => ({
  RepaymentStatus: {
    Completed: "完了",
    Delayed: "遅延",
    Pending: "未完了",
  },
}));

// RepaymentContextをモック
const mockRepaymentHistories = [
  {
    id: "1",
    updatedAt: "2024-01-15",
    beforeStatus: "未完了",
    status: RepaymentStatus.Completed,
    amount: 50000,
  },
  {
    id: "2",
    updatedAt: "2024-01-10",
    beforeStatus: "完了",
    status: RepaymentStatus.Delayed,
    amount: 75000,
  },
  {
    id: "3",
    updatedAt: null,
    beforeStatus: "遅延",
    status: RepaymentStatus.Completed,
    amount: 30000,
  },
];

jest.mock("@/contexts/RepaymentContext", () => ({
  useRepaymentSchedule: jest.fn(() => ({
    repaymentHistories: mockRepaymentHistories,
  })),
}));

describe("RepaymentHistory component", () => {
  beforeEach(() => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    useRepaymentSchedule.mockReturnValue({
      repaymentHistories: mockRepaymentHistories,
    });
  });

  it("履歴データが表示される", () => {
    render(<RepaymentHistory />);

    expect(screen.getAllByTestId("card")).toHaveLength(3);
    expect(screen.getAllByTestId("card-content")).toHaveLength(3);
  });

  it("日付が正しい形式で表示される", () => {
    render(<RepaymentHistory />);

    expect(screen.getByText("2024/01/15")).toBeInTheDocument();
    expect(screen.getByText("2024/01/10")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument(); // updatedAtがnullの場合
  });

  it("金額が正しい形式で表示される", () => {
    render(<RepaymentHistory />);

    expect(screen.getByText("¥50,000")).toBeInTheDocument();
    expect(screen.getByText("¥75,000")).toBeInTheDocument();
    expect(screen.getByText("¥30,000")).toBeInTheDocument();
  });

  it("ステータス変更が正しく表示される", () => {
    render(<RepaymentHistory />);

    expect(screen.getByText("未完了")).toBeInTheDocument();
    expect(screen.getAllByText("完了")).toHaveLength(3); // beforeStatusとstatusを含む
    expect(screen.getAllByText("遅延")).toHaveLength(2); // beforeStatusとstatusで2つ存在

    expect(screen.getAllByText("から")).toHaveLength(3);
    expect(screen.getAllByText("に変更")).toHaveLength(3);
  });

  it("Badgeコンポーネントが正しく表示される", () => {
    render(<RepaymentHistory />);

    const badges = screen.getAllByTestId("badge");
    expect(badges).toHaveLength(6); // 各履歴につき2つ（beforeStatusとstatus）

    badges.forEach(badge => {
      expect(badge).toHaveAttribute("data-variant", "outline");
    });
  });

  it("カードのスタイルが適用される", () => {
    render(<RepaymentHistory />);

    const cards = screen.getAllByTestId("card");
    cards.forEach(card => {
      expect(card).toHaveClass(
        "border-gray-200",
        "hover:border-blue-200",
        "hover:shadow-custom",
        "transition-all",
        "duration-200"
      );
    });
  });

  it("カードコンテンツのスタイルが適用される", () => {
    render(<RepaymentHistory />);

    const cardContents = screen.getAllByTestId("card-content");
    cardContents.forEach(content => {
      expect(content).toHaveClass("p-6", "pt-4");
    });
  });

  it("レイアウト構造が正しい", () => {
    render(<RepaymentHistory />);

    const container = screen.getAllByTestId("card")[0].parentElement;
    expect(container).toHaveClass("space-y-3");
  });

  it("空の履歴データでも正しく動作する", () => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    useRepaymentSchedule.mockReturnValue({
      repaymentHistories: [],
    });

    render(<RepaymentHistory />);

    expect(screen.queryByTestId("card")).not.toBeInTheDocument();

    const container = document.querySelector(".space-y-3");
    expect(container).toBeInTheDocument();
    expect(container?.children).toHaveLength(0);
  });

  it("単一の履歴データでも正しく動作する", () => {
    const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
    useRepaymentSchedule.mockReturnValue({
      repaymentHistories: [mockRepaymentHistories[0]],
    });

    render(<RepaymentHistory />);

    expect(screen.getAllByTestId("card")).toHaveLength(1);
    expect(screen.getByText("2024/01/15")).toBeInTheDocument();
    expect(screen.getByText("¥50,000")).toBeInTheDocument();
  });

  describe("ステータス別のスタイリング", () => {
    it("完了ステータスのスタイルが適用される", () => {
      render(<RepaymentHistory />);

      const badges = screen.getAllByTestId("badge");
      const completedBadges = badges.filter(badge =>
        badge.textContent === "完了"
      );

      completedBadges.forEach(badge => {
        expect(badge).toHaveClass(
          "bg-green-50",
          "text-green-700",
          "border-green-200",
          "hover:bg-green-50"
        );
      });
    });

    it("遅延ステータスのスタイルが適用される", () => {
      render(<RepaymentHistory />);

      const badges = screen.getAllByTestId("badge");
      const delayedBadges = badges.filter(badge =>
        badge.textContent === "遅延"
      );

      delayedBadges.forEach(badge => {
        expect(badge).toHaveClass(
          "bg-red-50",
          "text-red-700",
          "border-red-200",
          "hover:bg-red-50"
        );
      });
    });

    it("未完了ステータスのスタイルが適用される", () => {
      render(<RepaymentHistory />);

      const badges = screen.getAllByTestId("badge");
      const pendingBadges = badges.filter(badge =>
        badge.textContent === "未完了"
      );

      pendingBadges.forEach(badge => {
        expect(badge).toHaveClass(
          "bg-orange-50",
          "text-orange-700",
          "border-orange-200",
          "hover:bg-orange-50"
        );
      });
    });
  });

  describe("データ形式のテスト", () => {
    it("大きな金額でも正しく表示される", () => {
      const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
      useRepaymentSchedule.mockReturnValue({
        repaymentHistories: [
          {
            id: "large",
            updatedAt: "2024-01-01",
            beforeStatus: "未完了",
            status: RepaymentStatus.Completed,
            amount: 1234567,
          },
        ],
      });

      render(<RepaymentHistory />);

      expect(screen.getByText("¥1,234,567")).toBeInTheDocument();
    });

    it("0円の金額でも正しく表示される", () => {
      const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
      useRepaymentSchedule.mockReturnValue({
        repaymentHistories: [
          {
            id: "zero",
            updatedAt: "2024-01-01",
            beforeStatus: "未完了",
            status: RepaymentStatus.Completed,
            amount: 0,
          },
        ],
      });

      render(<RepaymentHistory />);

      expect(screen.getByText("¥0")).toBeInTheDocument();
    });

    it("異なる日付形式でも正しく処理される", () => {
      const { useRepaymentSchedule } = require("@/contexts/RepaymentContext");
      useRepaymentSchedule.mockReturnValue({
        repaymentHistories: [
          {
            id: "date1",
            updatedAt: "2024-12-31",
            beforeStatus: "未完了",
            status: RepaymentStatus.Completed,
            amount: 10000,
          },
          {
            id: "date2",
            updatedAt: "2024-01-01",
            beforeStatus: "完了",
            status: RepaymentStatus.Delayed,
            amount: 20000,
          },
        ],
      });

      render(<RepaymentHistory />);

      expect(screen.getByText("2024/12/31")).toBeInTheDocument();
      expect(screen.getByText("2024/01/01")).toBeInTheDocument();
    });
  });

  describe("統合テスト", () => {
    it("完全な履歴アイテムが正しく表示される", () => {
      render(<RepaymentHistory />);

      // 最初の履歴アイテムを確認
      const firstCard = screen.getAllByTestId("card")[0];

      // 日付が含まれている
      expect(firstCard).toHaveTextContent("2024/01/15");

      // ステータス変更が含まれている
      expect(firstCard).toHaveTextContent("未完了");
      expect(firstCard).toHaveTextContent("完了");
      expect(firstCard).toHaveTextContent("から");
      expect(firstCard).toHaveTextContent("に変更");

      // 金額が含まれている
      expect(firstCard).toHaveTextContent("¥50,000");
    });

    it("複数の履歴アイテムが正しい順序で表示される", () => {
      render(<RepaymentHistory />);

      const cards = screen.getAllByTestId("card");

      // データの順序通りに表示されている
      expect(cards[0]).toHaveTextContent("¥50,000");
      expect(cards[1]).toHaveTextContent("¥75,000");
      expect(cards[2]).toHaveTextContent("¥30,000");
    });
  });
});