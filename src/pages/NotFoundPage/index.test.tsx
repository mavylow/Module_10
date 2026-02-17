import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import NotFoundPage from "@pages/NotFoundPage";

vi.mock("@assets/PageNotFoundIcon", () => ({
  default: () => <svg data-testid="page-not-found-icon"></svg>,
}));

describe("Fallback", () => {
  it("render correct ui", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(screen.getByTestId("page-not-found-icon")).toBeInTheDocument();
  });
});
