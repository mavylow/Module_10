import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Fallback from "@pages/Fallback";

vi.mock("@assets/CrossIcon", () => ({
  default: () => <svg data-testid="cross-icon"></svg>,
}));

vi.mock("@components/Header", () => ({
  default: () => <header data-testid="header"></header>,
}));

vi.mock("@components/Footer", () => ({
  default: () => <footer data-testid="footer"></footer>,
}));

describe("Fallback", () => {
  it("render correct ui", () => {
    render(<Fallback />);
    expect(
      screen.getByText("Oops... Something bad has just happened")
    ).toBeInTheDocument();
    expect(screen.getByTestId("cross-icon")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
