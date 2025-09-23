import Greeting from "@/components/dashboard/Greeting";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Greeting component", () => {
  it("ユーザー名付きの挨拶メッセージが表示される", () => {
    render(<Greeting />);

    expect(
      screen.getByText("おかえりなさい、testユーザーさん！")
    ).toBeInTheDocument();
  });

  it("メッセージが表示される", () => {
    render(<Greeting />);

    expect(screen.getByText("開発&返済がんばりましょう！")).toBeInTheDocument();
  });

  it("見出しが正しく表示される", () => {
    render(<Greeting />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("おかえりなさい、testユーザーさん！");
  });
});
