import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Portal from "@components/Portal";

describe("Portal", () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    cleanup();
    modalRoot.remove();
    vi.clearAllMocks();
  });

  it("renders children inside modal element when modal root exists", () => {
    render(
      <Portal>
        <div data-testid="portal-content">Test Content</div>
      </Portal>
    );

    const content = screen.getByTestId("portal-content");

    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Test Content");
    expect(modalRoot).toContainElement(content);
  });

  it("renders multiple children correctly", () => {
    render(
      <Portal>
        <div data-testid="child-1">First</div>
        <div data-testid="child-2">Second</div>
        <span data-testid="child-3">Third</span>
      </Portal>
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
    expect(screen.getByTestId("child-3")).toBeInTheDocument();

    expect(modalRoot.children.length).toBe(3);
  });

  it("returns null and does not render children when modal root does not exist", () => {
    modalRoot.remove();

    render(
      <Portal>
        <div data-testid="portal-content">Test Content</div>
      </Portal>
    );

    expect(screen.queryByTestId("portal-content")).not.toBeInTheDocument();
  });
});
