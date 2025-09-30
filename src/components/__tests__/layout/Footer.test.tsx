import { Footer } from "@/components/layout/Footer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Footer component", () => {
  it("コピーライトテキストが表示される", () => {
    render(<Footer />);

    expect(screen.getByText("© 2025 KansaiTrack")).toBeInTheDocument();
  });

  it("フッター要素が正しく表示される", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("正しいCSSクラスが適用されている", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("text-center", "text-sm", "text-muted-foreground", "py-4");
  });
});