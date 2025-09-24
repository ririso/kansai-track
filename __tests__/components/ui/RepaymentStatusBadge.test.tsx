import { RepaymentStatusBadge } from "@/components/ui/RepaymentStatusBadge";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Badgeコンポーネントをモック
jest.mock("@/components/ui/shadcn/badge", () => ({
  Badge: ({ children, className, variant, ...props }: any) => (
    <span
      data-testid="badge"
      className={className}
      data-variant={variant}
      {...props}
    >
      {children}
    </span>
  ),
}));

// RepaymentStatusをモック
jest.mock("@/types/enums/repaymentStatus", () => ({
  RepaymentStatus: {
    Completed: "完了",
    Scheduled: "予定",
    Delayed: "遅延",
  },
}));

describe("RepaymentStatusBadge component", () => {
  it("完了ステータスのバッジが表示される", () => {
    render(<RepaymentStatusBadge status="完了" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("完了");
    expect(badge).toHaveAttribute("data-variant", "outline");
  });

  it("完了ステータスに緑色のスタイルが適用される", () => {
    render(<RepaymentStatusBadge status="完了" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "border",
      "bg-green-50",
      "text-green-700",
      "border-green-200",
      "hover:bg-green-50"
    );
  });

  it("遅延ステータスのバッジが表示される", () => {
    render(<RepaymentStatusBadge status="遅延" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("遅延");
  });

  it("遅延ステータスに赤色のスタイルが適用される", () => {
    render(<RepaymentStatusBadge status="遅延" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "border",
      "bg-red-50",
      "text-red-700",
      "border-red-200",
      "hover:bg-red-50"
    );
  });

  it("予定ステータスのバッジが表示される", () => {
    render(<RepaymentStatusBadge status="予定" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("予定");
  });

  it("予定ステータス（デフォルト）にオレンジ色のスタイルが適用される", () => {
    render(<RepaymentStatusBadge status="予定" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "border",
      "bg-orange-50",
      "text-orange-700",
      "border-orange-200",
      "hover:bg-orange-50"
    );
  });

  it("未知のステータスにデフォルトスタイル（オレンジ）が適用される", () => {
    render(<RepaymentStatusBadge status="未知のステータス" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "border",
      "bg-orange-50",
      "text-orange-700",
      "border-orange-200",
      "hover:bg-orange-50"
    );
  });

  it("カスタムクラス名が適用される", () => {
    render(
      <RepaymentStatusBadge
        status="完了"
        className="custom-badge-class"
      />
    );

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("custom-badge-class");
  });

  it("各ステータスの基本クラスが正しく適用される", () => {
    render(<RepaymentStatusBadge status="完了" />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("border");
    expect(badge).toHaveAttribute("data-variant", "outline");
  });

  describe("ステータス別スタイルテスト", () => {
    const statusTests = [
      {
        status: "完了",
        expectedClasses: [
          "bg-green-50",
          "text-green-700",
          "border-green-200",
          "hover:bg-green-50"
        ]
      },
      {
        status: "遅延",
        expectedClasses: [
          "bg-red-50",
          "text-red-700",
          "border-red-200",
          "hover:bg-red-50"
        ]
      },
      {
        status: "予定",
        expectedClasses: [
          "bg-orange-50",
          "text-orange-700",
          "border-orange-200",
          "hover:bg-orange-50"
        ]
      }
    ];

    statusTests.forEach(({ status, expectedClasses }) => {
      it(`${status}ステータスに正しいスタイルクラスが適用される`, () => {
        render(<RepaymentStatusBadge status={status} />);

        const badge = screen.getByTestId("badge");
        expectedClasses.forEach(className => {
          expect(badge).toHaveClass(className);
        });
      });
    });
  });

  describe("統合テスト", () => {
    it("完全なバッジが正しく表示される", () => {
      render(
        <RepaymentStatusBadge
          status="完了"
          className="additional-class"
        />
      );

      // 基本要素の存在確認
      const badge = screen.getByTestId("badge");
      expect(badge).toBeInTheDocument();

      // テキスト内容確認
      expect(badge).toHaveTextContent("完了");

      // 属性確認
      expect(badge).toHaveAttribute("data-variant", "outline");

      // スタイルクラス確認
      expect(badge).toHaveClass("border");
      expect(badge).toHaveClass("bg-green-50");
      expect(badge).toHaveClass("additional-class");
    });
  });
});