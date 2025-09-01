import ReturnLink from "@/components/common/ReturnLink";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// lucide-react のアイコンをモック
jest.mock("lucide-react", () => ({
  ArrowLeft: () => <svg data-testid="arrow-left" />,
}));

describe("ReturnLink component", () => {
  const href = "/test";
  const label = "戻る";

  it("テキストが表示される", () => {
    render(<ReturnLink href={href} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("正しいリンク先になっている", () => {
    render(<ReturnLink href={href} label={label} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", href);
  });

  it("アイコンが表示されている", () => {
    render(<ReturnLink href={href} label={label} />);
    const svg = screen.getByTestId("arrow-left");
    expect(svg).toBeInTheDocument();
  });
});
