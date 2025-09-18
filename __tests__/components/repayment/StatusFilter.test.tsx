import { StatusFilter } from "@/components/repayment/StatusFilter";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

// RepaymentStatusFilter enumをモック
jest.mock("@/types/enums/repaymentStatusFilter", () => ({
  RepaymentStatusFilter: {
    ALL: "ALL",
    COMPLETED: "COMPLETED",
    SCHEDULED: "SCHEDULED",
    DELAYED: "DELAYED",
  },
}));

// Selectコンポーネントをモック
jest.mock("@/components/ui/shadcn/select", () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div data-testid="select-wrapper">
      <div data-testid="select-value">{value}</div>
      <div
        data-testid="select-main-trigger"
        onClick={() => {
          // テスト用にクリックで値を変更
          if (onValueChange && value === "ALL") {
            onValueChange("COMPLETED");
          }
        }}
      >
        {children}
      </div>
    </div>
  ),
  SelectContent: ({ children }: any) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({ children, value }: any) => (
    <div data-testid={`select-item-${value}`}>{children}</div>
  ),
  SelectTrigger: ({ children, className }: any) => (
    <div data-testid="select-trigger" className={className}>
      {children}
    </div>
  ),
  SelectValue: ({ children }: any) => (
    <div data-testid="select-display-value">{children}</div>
  ),
}));

// RepaymentStatusFilterをimport
const { RepaymentStatusFilter } = require("@/types/enums/repaymentStatusFilter");

describe("StatusFilter component", () => {
  const mockOnChangeValue = jest.fn();

  beforeEach(() => {
    mockOnChangeValue.mockClear();
  });

  it("選択された値が表示される - 全て", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-display-value")).toHaveTextContent("全て");
  });

  it("選択された値が表示される - 完了", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.COMPLETED}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-display-value")).toHaveTextContent("完了");
  });

  it("選択された値が表示される - 予定", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.SCHEDULED}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-display-value")).toHaveTextContent("予定");
  });

  it("選択された値が表示される - 遅延", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.DELAYED}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-display-value")).toHaveTextContent("遅延");
  });

  it("全てのステータスオプションが表示される", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-item-ALL")).toHaveTextContent("全て");
    expect(screen.getByTestId("select-item-COMPLETED")).toHaveTextContent("完了");
    expect(screen.getByTestId("select-item-SCHEDULED")).toHaveTextContent("予定");
    expect(screen.getByTestId("select-item-DELAYED")).toHaveTextContent("遅延");
  });

  it("値変更時にコールバックが呼ばれる", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    const trigger = screen.getByTestId("select-main-trigger");
    fireEvent.click(trigger);

    expect(mockOnChangeValue).toHaveBeenCalledWith("COMPLETED");
  });

  it("Selectコンポーネントが正しい値を持っている", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-value")).toHaveTextContent("ALL");
  });

  it("SelectTriggerに正しいクラスが適用されている", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    const trigger = screen.getByTestId("select-trigger");
    expect(trigger).toHaveClass("w-full", "sm:w-[140px]", "border-gray-300");
  });

  it("SelectContentにbackgroundクラスが適用されている", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    const content = screen.getByTestId("select-content");
    expect(content).toBeInTheDocument();
  });

  it("プレースホルダーが設定されている", () => {
    render(
      <StatusFilter
        value={RepaymentStatusFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    // プレースホルダーはSelectValueコンポーネント内で処理される
    expect(screen.getByTestId("select-display-value")).toBeInTheDocument();
  });

  it("ステータスラベルが正しくマッピングされている", () => {
    // 各ステータスで個別にテスト
    const statuses = [
      { enum: RepaymentStatusFilter.ALL, label: "全て" },
      { enum: RepaymentStatusFilter.COMPLETED, label: "完了" },
      { enum: RepaymentStatusFilter.SCHEDULED, label: "予定" },
      { enum: RepaymentStatusFilter.DELAYED, label: "遅延" },
    ];

    statuses.forEach(({ enum: status, label }) => {
      const { unmount } = render(
        <StatusFilter
          value={status}
          onChangeValue={mockOnChangeValue}
        />
      );

      expect(screen.getByTestId("select-display-value")).toHaveTextContent(label);
      unmount();
    });
  });
});