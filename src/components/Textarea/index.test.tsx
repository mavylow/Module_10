import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import Textarea from "@components/Textarea";

const MockIcon = () => <svg data-testid="mock-icon" />;

describe("Textarea", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders label, icon and textarea", () => {
    render(
      <Textarea
        id="description"
        name="description"
        description="Description"
        placeholder="Write description"
        Icon={MockIcon}
        value=""
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();

    const textarea = screen.getByTestId("textarea");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", "Write description");
    expect(textarea).toHaveAttribute("id", "description");
    expect(textarea).toHaveAttribute("name", "description");
  });

  it("renders value correctly", () => {
    render(
      <Textarea
        id="description"
        name="description"
        description="Description"
        placeholder="Write description"
        Icon={MockIcon}
        value="Initial value"
        onChange={vi.fn()}
      />
    );

    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveValue("Initial value");
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Textarea
        id="description"
        name="description"
        description="Description"
        placeholder="Write description"
        Icon={MockIcon}
        value=""
        onChange={onChange}
      />
    );

    const textarea = screen.getByTestId("textarea");

    await user.type(textarea, "Hello");

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(5); // по символу
  });

  it("label is connected to textarea via htmlFor", () => {
    render(
      <Textarea
        id="description"
        name="description"
        description="Description"
        placeholder="Write description"
        Icon={MockIcon}
        value=""
        onChange={vi.fn()}
      />
    );

    const label = screen.getByText("Description").closest("label");
    const textarea = screen.getByTestId("textarea");

    expect(label).toHaveAttribute("for", "description");
    expect(textarea).toHaveAttribute("id", "description");
  });
});
