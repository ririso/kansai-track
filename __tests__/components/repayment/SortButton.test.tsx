import SortButton from "@/components/repayment/SortButton";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

// SortDirection enumをモック
jest.mock("@/types/enums/sortDirection", () => ({
  SortDirection: {
    ASC: "ASC",
    DESC: "DESC",
  },
}));

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  SortAsc: () => <svg data-testid="sort-asc-icon" />,
  SortDesc: () => <svg data-testid="sort-desc-icon" />,
}));

// SortDirectionをimport
const { SortDirection } = require("@/types/enums/sortDirection");

describe("SortButton component", () => {
  const mockOnChangeDirection = jest.fn();

  beforeEach(() => {
    mockOnChangeDirection.mockClear();
  });

  it("昇順状態で正しく表示される", () => {
    render(
      <SortButton
        sortDirection={SortDirection.ASC}
        onChangeDirection={mockOnChangeDirection}
      />
    );

    expect(screen.getByTestId("sort-asc-icon")).toBeInTheDocument();
    expect(screen.getByText("昇順")).toBeInTheDocument();
  });

  it("降順状態で正しく表示される", () => {
    render(
      <SortButton
        sortDirection={SortDirection.DESC}
        onChangeDirection={mockOnChangeDirection}
      />
    );

    expect(screen.getByTestId("sort-desc-icon")).toBeInTheDocument();
    expect(screen.getByText("降順")).toBeInTheDocument();
  });

  it("昇順から降順に切り替わる", () => {
    render(
      <SortButton
        sortDirection={SortDirection.ASC}
        onChangeDirection={mockOnChangeDirection}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnChangeDirection).toHaveBeenCalledWith(SortDirection.DESC);
  });

  it("降順から昇順に切り替わる", () => {
    render(
      <SortButton
        sortDirection={SortDirection.DESC}
        onChangeDirection={mockOnChangeDirection}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnChangeDirection).toHaveBeenCalledWith(SortDirection.ASC);
  });

  it("ボタンが正しいスタイルを持っている", () => {
    render(
      <SortButton
        sortDirection={SortDirection.ASC}
        onChangeDirection={mockOnChangeDirection}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "flex",
      "items-center",
      "gap-1",
      "px-3",
      "py-1",
      "border",
      "rounded",
      "hover:bg-gray-100",
      "transition"
    );
  });

  it("昇順時に正しい色のアイコンとテキストが表示される", () => {
    render(
      <SortButton
        sortDirection={SortDirection.ASC}
        onChangeDirection={mockOnChangeDirection}
      />
    );

    const ascIcon = screen.getByTestId("sort-asc-icon");
    const ascText = screen.getByText("昇順");

    expect(ascIcon).toHaveClass("h-4", "w-4", "text-blue-500");
    expect(ascText).toHaveClass("text-sm", "text-blue-600");
  });

  it("降順時に正しい色のアイコンとテキストが表示される", () => {
    render(
      <SortButton
        sortDirection={SortDirection.DESC}
        onChangeDirection={mockOnChangeDirection}
      />
    );

    const descIcon = screen.getByTestId("sort-desc-icon");
    const descText = screen.getByText("降順");

    expect(descIcon).toHaveClass("h-4", "w-4", "text-red-500");
    expect(descText).toHaveClass("text-sm", "text-red-600");
  });

  it("ボタンタイプがbuttonになっている", () => {
    render(
      <SortButton
        sortDirection={SortDirection.ASC}
        onChangeDirection={mockOnChangeDirection}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });
});