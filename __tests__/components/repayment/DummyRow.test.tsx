import { DummyRow } from "@/components/repayment/DummyRow";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

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
  it("基本的なダミー行が表示される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveClass("border-none");
  });

  it("指定された数のダミー行が作成される", () => {
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

  it("ダミー行が0個の場合は何も表示されない", () => {
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

  it("各行に正しい数のセルが含まれる", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(6); // 6列のテーブル
  });

  it("全てのダミーコンテンツが不透明度0で表示される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    // 各セルの内容を確認
    const cells = screen.getAllByRole("cell");

    // 最初の2つのセルにカレンダーアイコンとdummyテキスト
    expect(cells[0].querySelector(".opacity-0")).toBeInTheDocument();
    expect(cells[1].querySelector(".opacity-0")).toBeInTheDocument();

    // 3番目のセルに数値
    expect(cells[2].querySelector(".opacity-0")).toHaveTextContent("0");

    // 4番目のセルにバッジ
    expect(cells[3].querySelector(".opacity-0")).toBeInTheDocument();

    // 5,6番目のセルにdummyテキスト
    expect(cells[4].querySelector(".opacity-0")).toHaveTextContent("dummy");
    expect(cells[5].querySelector(".opacity-0")).toHaveTextContent("dummy");
  });

  it("カレンダーアイコンが正しく表示される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const calendarIcons = screen.getAllByTestId("calendar-icon");
    expect(calendarIcons).toHaveLength(2); // 最初の2つのセルにアイコン
  });

  it("Badgeコンポーネントが正しく表示される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("data-variant", "outline");
    expect(badge).toHaveClass("border", "opacity-0");
    expect(badge).toHaveTextContent("dummy");
  });

  it("各行にユニークなキーが設定される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={3} />
        </tbody>
      </table>
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);

    // 各行が正しく表示されていることを確認
    rows.forEach((row, index) => {
      expect(row).toHaveClass("border-none");
      const cells = row.querySelectorAll("td");
      expect(cells).toHaveLength(6);
    });
  });

  it("セルの基本スタイルが適用される", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole("cell");

    // 全てのセルが基本スタイルを持つ
    cells.forEach(cell => {
      expect(cell).toHaveClass("p-4", "align-middle");
    });

    // 最初の2つのセルはfont-medium
    expect(cells[0]).toHaveClass("font-medium");
    expect(cells[1]).toHaveClass("font-medium");
    // 3番目のセルはfont-mediumなし
    expect(cells[2]).not.toHaveClass("font-medium");
  });

  it("数値セルのフォントスタイルが正しい", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole("cell");
    const numberSpan = cells[2].querySelector("span");
    expect(numberSpan).toHaveClass("font-bold", "opacity-0");
  });

  it("アイコンのスタイルが正しい", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={1} />
        </tbody>
      </table>
    );

    const calendarIcons = screen.getAllByTestId("calendar-icon");
    expect(calendarIcons).toHaveLength(2);

    // アイコン自体がh-4 w-4 text-gray-500のクラスを持つ
    calendarIcons.forEach(icon => {
      expect(icon).toBeInTheDocument();
    });
  });

  it("大きな数のダミー行でもパフォーマンスが保たれる", () => {
    render(
      <table>
        <tbody>
          <DummyRow emptyRowCount={10} />
        </tbody>
      </table>
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(10);

    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(60); // 10行 × 6セル
  });

  describe("統合テスト", () => {
    it("完全なテーブル構造で正しく動作する", () => {
      render(
        <table className="w-full">
          <thead>
            <tr>
              <th>開始日</th>
              <th>終了日</th>
              <th>金額</th>
              <th>ステータス</th>
              <th>備考1</th>
              <th>備考2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-01-01</td>
              <td>2024-01-31</td>
              <td>100000</td>
              <td>完了</td>
              <td>実データ1</td>
              <td>実データ2</td>
            </tr>
            <DummyRow emptyRowCount={2} />
          </tbody>
        </table>
      );

      // ヘッダーとデータ行を含む全ての行
      const allRows = screen.getAllByRole("row");
      expect(allRows).toHaveLength(4); // header + data + 2 dummy

      // 実データの確認
      expect(screen.getByText("2024-01-01")).toBeInTheDocument();
      expect(screen.getByText("完了")).toBeInTheDocument();

      // ダミー行の確認
      const dummyRows = allRows.slice(2); // 最後の2行がダミー
      expect(dummyRows).toHaveLength(2);

      dummyRows.forEach(row => {
        expect(row).toHaveClass("border-none");
      });
    });

    it("空のテーブルでダミー行のみが表示される", () => {
      render(
        <table>
          <tbody>
            <DummyRow emptyRowCount={5} />
          </tbody>
        </table>
      );

      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(5);

      // 全ての行がダミー行として正しく表示される
      rows.forEach(row => {
        expect(row).toHaveClass("border-none");
        const cells = row.querySelectorAll("td");
        expect(cells).toHaveLength(6);
      });

      // カレンダーアイコンとバッジの総数を確認
      expect(screen.getAllByTestId("calendar-icon")).toHaveLength(10); // 5行 × 2アイコン
      expect(screen.getAllByTestId("badge")).toHaveLength(5); // 5行 × 1バッジ
    });
  });
});