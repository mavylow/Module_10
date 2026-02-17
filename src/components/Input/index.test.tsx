import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Input, { type FormInputProps } from "@components/Input";
import userEvent from "@testing-library/user-event";

const mockFormikInputProps = {
  id: "test",
  description: "Label for test input",
  placeholder: "Write text here",
  name: "test",
  type: "text",
  Icon: vi.fn().mockReturnValue(<svg data-testid="input-icon"></svg>),
  value: "",
  onChange: vi.fn(),
};

const mockFormInputProps: FormInputProps = {
  id: "password",
  description: "Label for test input",
  placeholder: "Write text here",
  type: "text",
  Icon: vi.fn().mockReturnValue(<svg data-testid="input-icon"></svg>),
  register: vi
    .fn()
    .mockReturnValue({ name: "password", value: "", onChange: vi.fn() }),
};

describe("Input", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it("ui input for useFormik hook", () => {
    render(<Input {...mockFormikInputProps} />);
    expect(screen.getByText("Label for test input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write text here")).toBeInTheDocument();
    expect(screen.getByTestId("input-icon")).toBeInTheDocument();
    expect(screen.getByLabelText("Label for test input")).toBeInTheDocument();
  });

  it("ui input for useForm hook", () => {
    render(<Input {...mockFormInputProps} />);
    expect(screen.getByText("Label for test input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write text here")).toBeInTheDocument();
    expect(screen.getByTestId("input-icon")).toBeInTheDocument();
    expect(screen.getByLabelText("Label for test input")).toBeInTheDocument();
  });

  it("typing in input useFormik hook", async () => {
    render(<Input {...mockFormikInputProps} />);

    const input = screen.getByPlaceholderText("Write text here");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "Test value");

    expect(mockFormikInputProps.onChange).toBeCalledTimes(10);
  });

  it("typing in input useForm hook", async () => {
    render(<Input {...mockFormInputProps} />);

    const input = screen.getByPlaceholderText("Write text here");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "Test value");

    expect(
      mockFormInputProps.register(mockFormInputProps.id, { required: true })
        .onChange
    ).toBeCalledTimes(10);
  });
});
