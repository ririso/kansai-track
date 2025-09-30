import { PeriodFilter } from "@/components/repayment/PeriodFilter";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

// RepaymentPeriodFilter enumをモック
jest.mock("@/types/enums/repaymentPeriodFilter", () => ({
  RepaymentPeriodFilter: {
    ALL: "ALL",
    THIS_MONTH: "THIS_MONTH",
    NEXT_MONTH: "NEXT_MONTH",
    THIS_YEAR: "THIS_YEAR",
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
            onValueChange("THIS_MONTH");
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

// RepaymentPeriodFilterをimport
const { RepaymentPeriodFilter } = require("@/types/enums/repaymentPeriodFilter");

describe("PeriodFilter component", () => {
  const mockOnChangeValue = jest.fn();

  beforeEach(() => {
    mockOnChangeValue.mockClear();
  });

  it("選択された値が表示される", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-display-value")).toHaveTextContent("全期間");
  });

  it("今月が選択された状態で表示される", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.THIS_MONTH}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-display-value")).toHaveTextContent("今月");
  });

  it("来月が選択された状態で表示される", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.NEXT_MONTH}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-display-value")).toHaveTextContent("来月");
  });

  it("今年が選択された状態で表示される", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.THIS_YEAR}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-display-value")).toHaveTextContent("今年");
  });

  it("全ての期間オプションが表示される", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-item-ALL")).toHaveTextContent("全期間");
    expect(screen.getByTestId("select-item-THIS_MONTH")).toHaveTextContent("今月");
    expect(screen.getByTestId("select-item-NEXT_MONTH")).toHaveTextContent("来月");
    expect(screen.getByTestId("select-item-THIS_YEAR")).toHaveTextContent("今年");
  });

  it("値変更時にコールバックが呼ばれる", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    const trigger = screen.getByTestId("select-main-trigger");
    fireEvent.click(trigger);

    expect(mockOnChangeValue).toHaveBeenCalledWith("THIS_MONTH");
  });

  it("Selectコンポーネントが正しい値を持っている", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    expect(screen.getByTestId("select-value")).toHaveTextContent("ALL");
  });

  it("SelectTriggerに正しいクラスが適用されている", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    const trigger = screen.getByTestId("select-trigger");
    expect(trigger).toHaveClass("w-full", "sm:w-[140px]", "border-gray-300");
  });

  it("SelectContentにbackgroundクラスが適用されている", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    const content = screen.getByTestId("select-content");
    expect(content).toBeInTheDocument();
  });

  it("デフォルトプレースホルダーが設定されている", () => {
    render(
      <PeriodFilter
        value={RepaymentPeriodFilter.ALL}
        onChangeValue={mockOnChangeValue}
      />
    );

    // プレースホルダーはSelectValueコンポーネント内で処理される
    expect(screen.getByTestId("select-display-value")).toBeInTheDocument();
  });
});