import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, expect, it, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Checkbox from ".";
import userEvent from "@testing-library/user-event";

const mockCheckboxProp = {
  id: "1",
  description: "Testing input",
  onToggle: vi.fn(),
};

describe("Checkbox", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders checkbox with correct label", () => {
    render(<Checkbox {...mockCheckboxProp} />);

    const checkbox = screen.getByTestId("checkbox");
    const label = screen.getByTestId("checkbox-label");

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Testing input");
    expect(checkbox).toHaveAttribute("id", "1");
    expect(label).toHaveAttribute("for", "1");
  });

  it("calls onToggle when checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox {...mockCheckboxProp} />);

    const checkbox = screen.getByTestId("checkbox");
    await user.click(checkbox);

    expect(mockCheckboxProp.onToggle).toHaveBeenCalledTimes(1);
  });

  it("calls onToggle when label is clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox {...mockCheckboxProp} />);

    const label = screen.getByTestId("checkbox-label");
    await user.click(label);

    expect(mockCheckboxProp.onToggle).toHaveBeenCalledTimes(1);
  });
});
