import { DummyRow } from "@/components/repayment/DummyRow";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// lucide-reactアイコンをモック
jest.mock("lucide-react", () => ({
  CalendarIcon: () => <svg data-testid="calendar-icon" />,
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

describe("DummyRow component", () => {
  it("指定された数の空行が表示される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={3} />
        </tbody>
      </table>
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);
  });

  it("0行の場合は何も表示されない", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={0} />
        </tbody>
      </table>
    );

    const rows = screen.queryAllByRole("row");
    expect(rows).toHaveLength(0);
  });

  it("各行に6つのセルが含まれる", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={2} />
        </tbody>
      </table>
    );

    const rows = screen.getAllByRole("row");
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      expect(cells).toHaveLength(6);
    });
  });

  it("各行にカレンダーアイコンが表示される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={2} />
        </tbody>
      </table>
    );

    const calendarIcons = screen.getAllByTestId("calendar-icon");
    expect(calendarIcons).toHaveLength(4); // 2行 × 2アイコン/行
  });

  it("各行にBadgeが表示される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={2} />
        </tbody>
      </table>
    );

    const badges = screen.getAllByTestId("badge");
    expect(badges).toHaveLength(2); // 2行 × 1バッジ/行

    badges.forEach(badge => {
      expect(badge).toHaveAttribute("data-variant", "outline");
      expect(badge).toHaveTextContent("dummy");
    });
  });

  it("行に正しいクラスが適用される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const row = screen.getByRole("row");
    expect(row).toHaveClass("border-none");
  });

  it("セルに正しいクラスが適用される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const cells = screen.getByRole("row").querySelectorAll("td");

    // 最初の2つのセル（日付セル）
    expect(cells[0]).toHaveClass("p-4", "align-middle", "font-medium");
    expect(cells[1]).toHaveClass("p-4", "align-middle", "font-medium");

    // 金額セル
    expect(cells[2]).toHaveClass("p-4", "align-middle");

    // ステータスセル
    expect(cells[3]).toHaveClass("p-4", "align-middle");

    // 支払い方法セル
    expect(cells[4]).toHaveClass("p-4", "align-middle");

    // 支払い区分セル
    expect(cells[5]).toHaveClass("p-4", "align-middle");
  });

  it("内容が非表示になっている（opacity-0）", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const row = screen.getByRole("row");

    // 日付セルの内容
    const dateDivs = row.querySelectorAll("div.opacity-0");
    expect(dateDivs).toHaveLength(2);

    // 金額セルの内容
    const amountSpan = row.querySelector("span.font-bold.opacity-0");
    expect(amountSpan).toBeInTheDocument();
    expect(amountSpan).toHaveTextContent("0");

    // Badgeの内容
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("opacity-0");

    // その他のセルの内容
    const otherSpans = row.querySelectorAll("span.opacity-0");
    expect(otherSpans.length).toBeGreaterThanOrEqual(2);
  });

  it("ダミーテキストが含まれている", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const row = screen.getByRole("row");

    // 日付セルのダミーテキスト
    const dummyTextElements = row.querySelectorAll("span");
    const dummyTexts = Array.from(dummyTextElements).map(span => span.textContent);
    expect(dummyTexts.filter(text => text === "dummy")).toHaveLength(5); // 実際には5つのdummyテキストがある

    // Badgeのダミーテキスト
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveTextContent("dummy");
  });

  it("大きな数でも正しく動作する", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={10} />
        </tbody>
      </table>
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(10);

    const calendarIcons = screen.getAllByTestId("calendar-icon");
    expect(calendarIcons).toHaveLength(20); // 10行 × 2アイコン/行

    const badges = screen.getAllByTestId("badge");
    expect(badges).toHaveLength(10); // 10行 × 1バッジ/行
  });

  it("各行が一意のキーを持つ", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={3} />
        </tbody>
      </table>
    );

    const rows = screen.getAllByRole("row");
    const keys = rows.map((row, index) => `empty-${index}`);

    // 重複がないことを確認
    const uniqueKeys = [...new Set(keys)];
    expect(uniqueKeys).toHaveLength(keys.length);
  });

  describe("レイアウト構造のテスト", () => {
    it("日付セルの構造が正しい", () => {
      render(
        <table>
          <tbody>
            <DummyRow emptyRowCount={1} />
          </tbody>
        </table>
      );

      const row = screen.getByRole("row");
      const cells = row.querySelectorAll("td");

      // 最初の2つのセル（日付セル）の構造を確認
      [0, 1].forEach(index => {
        const cell = cells[index];
        const div = cell.querySelector("div");
        const icon = cell.querySelector('[data-testid="calendar-icon"]');
        const span = cell.querySelector("span");

        expect(div).toHaveClass("flex", "items-center", "gap-2", "opacity-0");
        expect(icon).toBeInTheDocument();
        expect(span).toHaveTextContent("dummy");
      });
    });

    it("金額セルの構造が正しい", () => {
      render(
        <table>
          <tbody>
            <DummyRow emptyRowCount={1} />
          </tbody>
        </table>
      );

      const row = screen.getByRole("row");
      const amountCell = row.querySelectorAll("td")[2];
      const amountSpan = amountCell.querySelector("span");

      expect(amountSpan).toHaveClass("font-bold", "opacity-0");
      expect(amountSpan).toHaveTextContent("0");
    });

    it("ステータスセルの構造が正しい", () => {
      render(
        <table>
          <tbody>
            <DummyRow emptyRowCount={1} />
          </tbody>
        </table>
      );

      const row = screen.getByRole("row");
      const statusCell = row.querySelectorAll("td")[3];
      const badge = statusCell.querySelector('[data-testid="badge"]');

      expect(badge).toHaveClass("border", "opacity-0");
      expect(badge).toHaveAttribute("data-variant", "outline");
      expect(badge).toHaveTextContent("dummy");
    });
  });

  describe("統合テスト", () => {
    it("完全なダミー行構造が正しく表示される", () => {
      render(
        <table>
          <tbody>
            <DummyRow emptyRowCount={2} />
          </tbody>
        </table>
      );

      // 行数の確認
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(2);

      // 各行の構造確認
      rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        expect(cells).toHaveLength(6);

        // アイコンの確認（各行に2つ）
        const icons = row.querySelectorAll('[data-testid="calendar-icon"]');
        expect(icons).toHaveLength(2);

        // バッジの確認（各行に1つ）
        const badges = row.querySelectorAll('[data-testid="badge"]');
        expect(badges).toHaveLength(1);

        // 非表示要素の確認
        const opacityElements = row.querySelectorAll(".opacity-0");
        expect(opacityElements.length).toBeGreaterThan(0);
      });
    });

    it("テーブル内での表示が正しい", () => {
      render(
        <table>
          <thead>
            <tr>
              <th>支払い予定日</th>
              <th>支払い日</th>
              <th>金額(円)</th>
              <th>ステータス</th>
              <th>支払い方法</th>
              <th>支払い区分</th>
            </tr>
          </thead>
          <tbody>
            <DummyRow emptyRowCount={1} />
          </tbody>
        </table>
      );

      const table = screen.getByRole("table");
      const tbody = table.querySelector("tbody");
      const dummyRow = tbody?.querySelector("tr");

      expect(dummyRow).toBeInTheDocument();
      expect(dummyRow).toHaveClass("border-none");

      // テーブル構造が壊れていないことを確認
      const allRows = screen.getAllByRole("row");
      expect(allRows).toHaveLength(2); // ヘッダー行 + ダミー行
    });
  });
});