import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Modal from "@components/Modal";
import userEvent from "@testing-library/user-event";
import { PopUpContext } from "@/providers/PopupProvider";
import type { ReactNode } from "react";

vi.mock("@assets/CrossIcon", () => ({
  default: () => <svg data-testid="cross-icon"></svg>,
}));

vi.mock("@components/Portal", () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="modal-portal">{children}</div>
  ),
}));

const mockHandleClose = vi.fn();

const renderModal = (isOpen = true) => {
  const mockContext = {
    isOpen,
    handleShowModal: vi.fn(),
    handleCloseModal: mockHandleClose,
  };
  render(
    <PopUpContext.Provider value={{ ...mockContext }}>
      <Modal {...mockModalProps} />
    </PopUpContext.Provider>
  );
};

const mockModalProps = {
  message: "Modal message",
  status: "success" as const,
};

describe("Modal", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("ui of success modal", () => {
    renderModal();

    expect(screen.getByTestId("modal-portal")).toBeInTheDocument();
    expect(screen.getByTestId("modal-message")).toBeInTheDocument();
    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.getByTestId("cross-icon")).toBeInTheDocument();

    const modal = screen.getByTestId("modal-message");
    expect(modal).toHaveClass("modal--open");
    expect(modal).toHaveClass("success");
  });

  it("calls handleCloseModal when close button is clicked", async () => {
    const user = userEvent.setup();

    renderModal(true);

    const closeButton = screen.getByTestId("button");
    await user.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it("does not render modal when isOpen is false", () => {
    renderModal(false);

    expect(screen.queryByTestId("modal-message")).toHaveClass("modal--close");
  });
});
