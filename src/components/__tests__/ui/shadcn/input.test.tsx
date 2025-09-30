import { Input } from "@/components/ui/shadcn/input";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

// cn関数をモック
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("Input component", () => {
  it("基本的な入力フィールドが表示される", () => {
    render(<Input data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("デフォルトのtypeがtextになっている", () => {
    render(<Input data-testid="input" />);

    const input = screen.getByTestId("input");
    // HTMLのinput要素はtypeが指定されない場合、デフォルトでtextとして動作する
    expect(input.getAttribute("type")).toBe(null); // 明示的に指定されていない場合はnull
    expect(input).toHaveProperty("type", "text"); // 実際のHTML要素のプロパティはtext
  });

  it("カスタムtypeが適用される", () => {
    render(<Input type="email" data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "email");
  });

  it("passwordタイプが適用される", () => {
    render(<Input type="password" data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "password");
  });

  it("numberタイプが適用される", () => {
    render(<Input type="number" data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "number");
  });

  it("カスタムクラス名が適用される", () => {
    render(<Input className="custom-input" data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveClass("custom-input");
  });

  it("placeholderが表示される", () => {
    render(<Input placeholder="Enter text" data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("値の入力が正しく動作する", () => {
    render(<Input data-testid="input" />);

    const input = screen.getByTestId("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test value" } });

    expect(input.value).toBe("test value");
  });

  it("disabled状態が正しく動作する", () => {
    render(<Input disabled data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toBeDisabled();
  });

  it("readonly状態が正しく動作する", () => {
    render(<Input readOnly data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("readonly");
  });

  it("required属性が適用される", () => {
    render(<Input required data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("required");
  });

  it("onChangeイベントが正しく動作する", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} data-testid="input" />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(handleChange).toHaveBeenCalled();
  });

  it("onFocusイベントが正しく動作する", () => {
    const handleFocus = jest.fn();
    render(<Input onFocus={handleFocus} data-testid="input" />);

    const input = screen.getByTestId("input");
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalled();
  });

  it("onBlurイベントが正しく動作する", () => {
    const handleBlur = jest.fn();
    render(<Input onBlur={handleBlur} data-testid="input" />);

    const input = screen.getByTestId("input");
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalled();
  });

  it("maxLength属性が適用される", () => {
    render(<Input maxLength={10} data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("maxLength", "10");
  });

  it("aria-invalid属性が適用される", () => {
    render(<Input aria-invalid="true" data-testid="input" />);

    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("defaultValue が設定される", () => {
    render(<Input defaultValue="default text" data-testid="input" />);

    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input.value).toBe("default text");
  });

  it("value プロパティが制御される", () => {
    const { rerender } = render(<Input value="initial" data-testid="input" readOnly />);

    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input.value).toBe("initial");

    rerender(<Input value="updated" data-testid="input" readOnly />);
    expect(input.value).toBe("updated");
  });

  it("フォームサブミットで値が送信される", () => {
    const handleSubmit = jest.fn((e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      expect(formData.get("test-input")).toBe("submit test");
    });

    render(
      <form onSubmit={handleSubmit}>
        <Input name="test-input" defaultValue="submit test" data-testid="input" />
        <button type="submit">Submit</button>
      </form>
    );

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});