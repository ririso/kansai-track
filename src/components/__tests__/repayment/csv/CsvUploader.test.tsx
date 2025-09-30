import CSVUploader from "@/components/repayment/csv/CsvUploader";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// 外部ライブラリのモック
jest.mock("papaparse", () => ({
  parse: jest.fn((data, options) => {
    // テスト用の模擬CSVデータ
    const mockResults = {
      data: [
        { "日付": "2024-01-01", "金額": "10000", "内容": "返済" },
        { "日付": "2024-02-01", "金額": "10000", "内容": "返済" }
      ]
    };
    // complete コールバックを同期的に実行
    if (options.complete) {
      options.complete(mockResults);
    }
  }),
}));

jest.mock("encoding-japanese", () => ({
  convert: jest.fn(() => "mocked-unicode-string"),
}));

// Context のモック
jest.mock("@/contexts/RepaymentContext", () => ({
  useRepaymentSchedule: () => ({
    schedules: [
      { id: 1, date: "2024-01-01", amount: 10000 },
      { id: 2, date: "2024-02-01", amount: 10000 }
    ],
  }),
}));

// Utility 関数のモック
jest.mock("@/utils/mapJapaneseKeysToEnglish", () => ({
  mapJapaneseKeysToEnglish: jest.fn((data) => data.map((item: any) => ({
    date: item["日付"],
    amount: item["金額"],
    description: item["内容"]
  }))),
}));

jest.mock("@/utils/reconcileScheduleWithCSV", () => ({
  reconcileScheduleWithCSV: jest.fn(() => [
    { id: 1, reconciled: true },
    { id: 2, reconciled: true }
  ]),
}));

// lucide-react アイコンのモック
jest.mock("lucide-react", () => ({
  Upload: () => <svg data-testid="upload-icon" />,
}));

// fetch のモック
global.fetch = jest.fn();

// process.env のモック
const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_API_ENDPOINT: "https://test-api.example.com"
  };
  (global.fetch as jest.Mock).mockClear();
});

afterEach(() => {
  process.env = originalEnv;
});

// alert のモック
global.alert = jest.fn();

describe("CSVUploader component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("CSVアップロードボタンが表示される", () => {
    render(<CSVUploader />);

    const button = screen.getByText("CSVアップロード");
    expect(button).toBeInTheDocument();
  });

  it("アップロードアイコンが表示される", () => {
    render(<CSVUploader />);

    expect(screen.getByTestId("upload-icon")).toBeInTheDocument();
  });

  it("ボタンに正しいスタイルが適用されている", () => {
    render(<CSVUploader />);

    const button = screen.getByText("CSVアップロード");
    expect(button).toHaveClass(
      "border-blue-200",
      "text-blue-600",
      "hover:bg-blue-50",
      "bg-transparent"
    );
  });

  it("隠しファイル入力が存在する", () => {
    render(<CSVUploader />);

    const fileInput = screen.getByRole("button").parentNode?.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute("accept", ".csv");
    expect(fileInput).toHaveStyle({ display: "none" });
  });

  it("ボタンクリックでファイル選択が開く", () => {
    render(<CSVUploader />);

    const fileInput = screen.getByRole("button").parentNode?.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, "click").mockImplementation(() => {});

    const button = screen.getByText("CSVアップロード");
    fireEvent.click(button);

    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it("CSVファイルアップロード処理が正常に動作する", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
    });

    render(<CSVUploader />);

    const fileInput = screen.getByRole("button").parentNode?.querySelector('input[type="file"]') as HTMLInputElement;

    // モックファイルを作成
    const mockFile = new File(["date,amount\n2024-01-01,10000"], "test.csv", {
      type: "text/csv"
    });

    // ArrayBuffer のモック
    Object.defineProperty(mockFile, 'arrayBuffer', {
      value: jest.fn().mockResolvedValue(new ArrayBuffer(8))
    });

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://test-api.example.com/transactions/uploads",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    expect(global.alert).toHaveBeenCalledWith("アップロード成功");
  });

  it("アップロード失敗時にエラーメッセージが表示される", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: jest.fn().mockResolvedValue("Server Error"),
    });

    render(<CSVUploader />);

    const fileInput = screen.getByRole("button").parentNode?.querySelector('input[type="file"]') as HTMLInputElement;

    const mockFile = new File(["date,amount\n2024-01-01,10000"], "test.csv", {
      type: "text/csv"
    });

    Object.defineProperty(mockFile, 'arrayBuffer', {
      value: jest.fn().mockResolvedValue(new ArrayBuffer(8))
    });

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("アップロード失敗");
    });
  });

  it("ファイルが選択されていない場合は処理されない", () => {
    render(<CSVUploader />);

    const fileInput = screen.getByRole("button").parentNode?.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: null } });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("ネットワークエラー時の処理", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<CSVUploader />);

    const fileInput = screen.getByRole("button").parentNode?.querySelector('input[type="file"]') as HTMLInputElement;

    const mockFile = new File(["date,amount\n2024-01-01,10000"], "test.csv", {
      type: "text/csv"
    });

    Object.defineProperty(mockFile, 'arrayBuffer', {
      value: jest.fn().mockResolvedValue(new ArrayBuffer(8))
    });

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    // ネットワークエラーが発生してもクラッシュしないことを確認
    await waitFor(() => {
      expect(fileInput).toBeInTheDocument();
    });
  });
});