import Pagination from "@/components/common/Pagination";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Pagination component", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it("正しい表示情報が表示される", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalCount={50}
        itemsPerPage={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("50件中 1-10件を表示")).toBeInTheDocument();
  });

  it("前へボタンが最初のページで無効になっている", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalCount={50}
        itemsPerPage={10}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByText("前へ");
    expect(prevButton).toBeDisabled();
  });

  it("次へボタンが最後のページで無効になっている", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        totalCount={50}
        itemsPerPage={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText("次へ");
    expect(nextButton).toBeDisabled();
  });

  it("ページ番号クリックでコールバックが呼ばれる", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalCount={50}
        itemsPerPage={10}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});