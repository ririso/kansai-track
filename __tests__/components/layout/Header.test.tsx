import { Header } from "@/components/layout/Header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// lucide-react のアイコンをモック
jest.mock("lucide-react", () => ({
  Bell: () => <svg data-testid="bell-icon" />,
  Settings: () => <svg data-testid="settings-icon" />,
  User: () => <svg data-testid="user-icon" />,
}));

describe("Header component", () => {
  it("アプリケーションタイトルが表示される", () => {
    render(<Header />);

    expect(screen.getByText("奨学金返済ダッシュボード")).toBeInTheDocument();
  });

  it("ロゴが表示される", () => {
    render(<Header />);

    expect(screen.getByText("奨")).toBeInTheDocument();
  });

  it("ベルアイコンボタンが表示される", () => {
    render(<Header />);

    expect(screen.getByTestId("bell-icon")).toBeInTheDocument();
  });

  it("設定アイコンボタンが表示される", () => {
    render(<Header />);

    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
  });

  it("ユーザーアイコンボタンが表示される", () => {
    render(<Header />);

    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("ヘッダー要素が正しく表示される", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });
});