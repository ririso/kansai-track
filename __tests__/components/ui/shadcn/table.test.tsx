import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("Table components", () => {
  describe("Table", () => {
    it("基本的なテーブルが表示される", () => {
      render(
        <Table data-testid="table">
          <TableBody>
            <TableRow>
              <TableCell>Cell content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const table = screen.getByTestId("table");
      expect(table).toBeInTheDocument();
      expect(table.tagName).toBe("TABLE");
    });

    it("テーブルがスクロール可能なコンテナに包まれている", () => {
      render(
        <Table data-testid="table">
          <TableBody>
            <TableRow>
              <TableCell>Cell content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const table = screen.getByTestId("table");
      const container = table.parentElement;
      expect(container).toHaveClass("relative", "w-full", "overflow-auto");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Table className="custom-table" data-testid="table">
          <TableBody>
            <TableRow>
              <TableCell>Cell content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const table = screen.getByTestId("table");
      expect(table).toHaveClass("custom-table");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLTableElement>();
      render(
        <Table ref={ref} data-testid="table">
          <TableBody>
            <TableRow>
              <TableCell>Cell content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(ref.current).toBeInstanceOf(HTMLTableElement);
    });
  });

  describe("TableHeader", () => {
    it("テーブルヘッダーが表示される", () => {
      render(
        <Table>
          <TableHeader data-testid="table-header">
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      const header = screen.getByTestId("table-header");
      expect(header).toBeInTheDocument();
      expect(header.tagName).toBe("THEAD");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Table>
          <TableHeader className="custom-header" data-testid="table-header">
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      const header = screen.getByTestId("table-header");
      expect(header).toHaveClass("custom-header");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLTableSectionElement>();
      render(
        <Table>
          <TableHeader ref={ref} data-testid="table-header">
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
    });
  });

  describe("TableBody", () => {
    it("テーブルボディが表示される", () => {
      render(
        <Table>
          <TableBody data-testid="table-body">
            <TableRow>
              <TableCell>Body content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const body = screen.getByTestId("table-body");
      expect(body).toBeInTheDocument();
      expect(body.tagName).toBe("TBODY");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Table>
          <TableBody className="custom-body" data-testid="table-body">
            <TableRow>
              <TableCell>Body content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const body = screen.getByTestId("table-body");
      expect(body).toHaveClass("custom-body");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLTableSectionElement>();
      render(
        <Table>
          <TableBody ref={ref} data-testid="table-body">
            <TableRow>
              <TableCell>Body content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
    });
  });

  describe("TableFooter", () => {
    it("テーブルフッターが表示される", () => {
      render(
        <Table>
          <TableFooter data-testid="table-footer">
            <TableRow>
              <TableCell>Footer content</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      const footer = screen.getByTestId("table-footer");
      expect(footer).toBeInTheDocument();
      expect(footer.tagName).toBe("TFOOT");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Table>
          <TableFooter className="custom-footer" data-testid="table-footer">
            <TableRow>
              <TableCell>Footer content</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      const footer = screen.getByTestId("table-footer");
      expect(footer).toHaveClass("custom-footer");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLTableSectionElement>();
      render(
        <Table>
          <TableFooter ref={ref} data-testid="table-footer">
            <TableRow>
              <TableCell>Footer content</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
    });
  });

  describe("TableRow", () => {
    it("テーブル行が表示される", () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="table-row">
              <TableCell>Row content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const row = screen.getByTestId("table-row");
      expect(row).toBeInTheDocument();
      expect(row.tagName).toBe("TR");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Table>
          <TableBody>
            <TableRow className="custom-row" data-testid="table-row">
              <TableCell>Row content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const row = screen.getByTestId("table-row");
      expect(row).toHaveClass("custom-row");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLTableRowElement>();
      render(
        <Table>
          <TableBody>
            <TableRow ref={ref} data-testid="table-row">
              <TableCell>Row content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
    });
  });

  describe("TableHead", () => {
    it("テーブルヘッドセルが表示される", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead data-testid="table-head">Header Cell</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      const head = screen.getByTestId("table-head");
      expect(head).toBeInTheDocument();
      expect(head.tagName).toBe("TH");
      expect(head).toHaveTextContent("Header Cell");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="custom-head" data-testid="table-head">Header Cell</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      const head = screen.getByTestId("table-head");
      expect(head).toHaveClass("custom-head");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLTableCellElement>();
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead ref={ref} data-testid="table-head">Header Cell</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    });
  });

  describe("TableCell", () => {
    it("テーブルセルが表示される", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="table-cell">Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const cell = screen.getByTestId("table-cell");
      expect(cell).toBeInTheDocument();
      expect(cell.tagName).toBe("TD");
      expect(cell).toHaveTextContent("Cell Content");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="custom-cell" data-testid="table-cell">Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const cell = screen.getByTestId("table-cell");
      expect(cell).toHaveClass("custom-cell");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLTableCellElement>();
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell ref={ref} data-testid="table-cell">Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    });
  });

  describe("TableCaption", () => {
    it("テーブルキャプションが表示される", () => {
      render(
        <Table>
          <TableCaption data-testid="table-caption">Table Caption</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const caption = screen.getByTestId("table-caption");
      expect(caption).toBeInTheDocument();
      expect(caption.tagName).toBe("CAPTION");
      expect(caption).toHaveTextContent("Table Caption");
    });

    it("カスタムクラス名が適用される", () => {
      render(
        <Table>
          <TableCaption className="custom-caption" data-testid="table-caption">Table Caption</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const caption = screen.getByTestId("table-caption");
      expect(caption).toHaveClass("custom-caption");
    });

    it("forwardRefが正しく動作する", () => {
      const ref = React.createRef<HTMLTableCaptionElement>();
      render(
        <Table>
          <TableCaption ref={ref} data-testid="table-caption">Table Caption</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(ref.current).toBeInstanceOf(HTMLTableCaptionElement);
    });
  });

  describe("統合テスト", () => {
    it("完全なテーブル構造が正しく表示される", () => {
      render(
        <Table data-testid="complete-table">
          <TableCaption>Sample Data Table</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>30</TableCell>
              <TableCell>New York</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>25</TableCell>
              <TableCell>London</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total: 2 people</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      // 全ての要素が存在することを確認
      expect(screen.getByTestId("complete-table")).toBeInTheDocument();
      expect(screen.getByText("Sample Data Table")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Age")).toBeInTheDocument();
      expect(screen.getByText("City")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("Total: 2 people")).toBeInTheDocument();

      // テーブル構造の確認
      const table = screen.getByTestId("complete-table");
      expect(table.querySelector("thead")).toBeInTheDocument();
      expect(table.querySelector("tbody")).toBeInTheDocument();
      expect(table.querySelector("tfoot")).toBeInTheDocument();
      expect(table.querySelector("caption")).toBeInTheDocument();
    });

    it("レスポンシブ対応のスクロール機能が有効になっている", () => {
      render(
        <Table data-testid="responsive-table">
          <TableBody>
            <TableRow>
              <TableCell>Very long content that might require horizontal scrolling on smaller screens</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const table = screen.getByTestId("responsive-table");
      const container = table.parentElement;

      // スクロール可能なコンテナが存在することを確認
      expect(container).toHaveClass("overflow-auto");
      expect(container).toHaveClass("w-full");
    });
  });
});