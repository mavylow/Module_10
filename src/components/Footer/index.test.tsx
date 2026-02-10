import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Footer from "@components/Footer";

describe("Footer", () => {
  it("Simple comment", () => {
    render(<Footer />);
    expect(screen.getByText(/sidekick/i)).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });
});
